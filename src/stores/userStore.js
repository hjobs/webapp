// import React from 'react';
import Reflux from 'reflux';
// import { withRouter, matchPath } from 'react-router-dom';
// const queryString = require("query-string");

import { yyyymmddhhmmss } from '../services/var';
import { log, request, exRequest } from '../services/http';
import { uploadPhoto, deletePhoto } from '../services/upload';
import { getTranslations } from './translationStore';

import { profileEditLog } from './data/log';
import { getJobExpEditErrors, getJobExpHttpArray, getLocationObject } from './data/profile';

export const UserActions = Reflux.createActions({
  refreshUser: {},
  logout: {},
  setUser: {},
  setAppliedJobs: {},
  updateUser: {},
  removeTemporaryUser: {},
  editProfileItem: {},
  cancelProfileEdit: {},
  submitProfileEdit: {asyncResult: true}
});

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.listenables = UserActions;
    this.refreshUser();
  }

  getInitialState() {
    return {
      user: null,
      authToken: localStorage.getItem("authToken"),
      appliedJobs: JSON.parse(localStorage.getItem('appliedJobs')),
      profile: this.getEmptyProfileEdit()
    };
  }

  getEmptyProfileEdit() {
    return {
      editing: {key: null, data: null},
      loading: false,
      errorMsg: null
    };
  }

  getAuthToken() { return localStorage.getItem("authToken"); }

  refreshUser() {
    console.log(["refreshing user, logging this.getAuthToken()", this.getAuthToken()])
    if (this.getAuthToken()) this.getUserFromAuthToken();
  }

  setUser(userObject, authToken) {
    console.log(["inside userStore, setting user", userObject, authToken]);
    if (!!authToken) localStorage.setItem("authToken", authToken);
    if (this.userObjectIsValid(userObject)) {
      const nextState = this.state;
      nextState.user = userObject;
      if (!!authToken) nextState.authToken = authToken;
      this.setState(nextState)
    }
  }

  setAppliedJobs(arr) {
    localStorage.setItem("appliedJobs", JSON.stringify(arr));
    this.setState({appliedJobs: arr});
  }

  updateUser(key, value) {
    let user = this.state.user;
    if (!user) user = {};
    user[key] = value;
    this.setState({user});
  }

  removeTemporaryUser() {
    this.setState(s => {
      s.user = null;
      return s;
    });
  }

  getUserFromAuthToken() {
    console.log("getting user from auth_token");
    request('get_employee').then(res => res.json()).then(d => {
      // console.log(d);
      if (!!d && !d.error) {
        this.setUser(d);
      } else {
        this.logout(true);
      }
    })
  }

  userObjectIsValid(userObject) { return !!userObject; }

  /** @param {boolean} skipLog */
  logout(skipLog) {
    if (skipLog !== true) {
      log({
        name: "Logout",
        action: "Click",
        component: "Navbar"
      });
    }
    request("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("appliedJobs");
    this.setState(this.getInitialState());
  }







  editProfileItem(data, key) {
    let profile = this.state.profile;
    if (!key && !profile.editing.key) return null;
    if (!!key) profile.editing.key = key;
    profile.editing.data = data;
    this.setState({profile});
  }

  submitProfileEdit(data, key) {
    const profile = this.state.profile,
          editingKey = key || profile.editing.key,
          t = getTranslations();
    let editingData = data || profile.editing.data;  
    if (
      (profile.editing.data === this.state.user[editingKey]) ||
      ((editingData === null || !editingData.toString()) && !this.state.user[editingKey])
    ) return this.submitProfileEditCompleted(this.state.user);
    profile.loading = true;
    this.setState({profile});

    const submit = (url, method, obj) => {
      console.log(["submiting", url, method, obj]);
      request(url, method, obj).then(res => {
        console.log(res);
        if (!res.ok) return this.submitProfileEditFailed(res.statusText)
        return res.json();
      }).then(d => {
        console.log(d);
        if (!!d && !d.error) {
          this.submitProfileEditCompleted(d);
        } else {
          this.submitProfileEditFailed(!!d ? d.error : "There is an error with your data");
        }
      })
    }

    const url = "employees/" + this.state.user.id;
    let  obj = { employee: {} };
    switch (editingKey) {
      case "location":
        if (!editingData) {
          submit(url, "PATCH", {employee: {location: {}}})
        } else {
          this.getGoogleDataFromStreet(editingData).then(data => {
            console.log(["submitStreetName got google data", data]);
            if (!data || data.status !== "OK") return this.submitProfileEditFailed(t.profile.cannotProcessStreetName);
            obj.employee.location = getLocationObject(data, editingData);
            submit(url, "PATCH", obj);
          }).catch(() => this.submitProfileEditFailed(t.profile.cannotProcessStreetName));
        }
        break;
      case "lang_qs":
        let error = "";
        editingData.forEach(editingObj => {
          if (!editingObj.level && !error) error = (t.profile.missingFluency);
        });
        if (!!error) return this.submitProfileEditFailed(error);
        obj.employee.lang_qs = editingData;
        submit(url, "PATCH", obj);
        break;
      case (editingKey.match(/^job-exp/) || {}).input:
        const errors = getJobExpEditErrors(editingData);
        if (errors.length > 0) return this.submitProfileEditFailed(errors);
        
        const modifyJobExpThenSubmit = (locationData) => {
          obj.employee = {
            job_exps: getJobExpHttpArray(editingData, locationData)
          };
          console.log(["modifyJobExpThenSubmit, obj", obj]);
          submit(url, "PATCH", obj)
        }

        let needToUpdateLocation;
        if (!editingData.id) needToUpdateLocation = true; // is new edit
        else {
          const originalData = this.state.user.job_exps.reduce((result, curr) => {
            if (!!result) return result;
            if (curr.id === editingData.id) return curr;
          }, null);
          needToUpdateLocation = (originalData.location !== editingData.location);
        }

        if (needToUpdateLocation && !!editingData.location) {
          this.getGoogleDataFromStreet(editingData.location).then(d => {
            if (d.status !== "OK") return this.submitProfileEditFailed(t.profile.cannotProcessStreetName);
            console.log("status === OK");
            modifyJobExpThenSubmit(d);
          }).catch(() => this.submitProfileEditFailed(t.profile.cannotProcessStreetName))
        } else {
          modifyJobExpThenSubmit();
        }
        break;
      // case "cv":
      //   if (!!editingData) {
      //     const hasHttp = /^http/i.test(editingData);
      //     if (!hasHttp) editingData = "http://" + editingData;
      //   }
      //   obj.employee[editingKey] = !!editingData ? editingData : null;
      //   submit(url, "PATCH", obj);
      //   break;
      case "image": case "cv":
        const prevUrl = this.state.user[editingKey];
        uploadPhoto({
          uriComponents: [
            "Employees",
            this.state.user.name || this.state.user.first_name,
            editingKey + yyyymmddhhmmss(new Date())
          ],
          file: editingData
        }).then(objectUrl => {
          if (!objectUrl) return this.submitProfileEditFailed("No file found");
          obj.employee[editingKey] = objectUrl;
          submit(url, "PATCH", obj);
          deletePhoto(prevUrl);
        }).catch(reason => this.submitProfileEditFailed(reason.toString()))
        break;
      default:
        obj.employee[editingKey] = !!editingData ? editingData : null;
        submit(url, "PATCH", obj)
        break;
    }
  }

  needToUpdateLocation(editingData) {
    if (!editingData.id) return true;
    const originalData = this.state.user.job_exps.reduce((result, curr) => {
      if (!!result) return result;
      if (curr.id === editingData.id) return curr;
    }, null);
    return (originalData.location !== editingData.location);
  }

  submitProfileEditCompleted(data) {
    console.log(["submitProfileEditCompleted, logging data", data])
    const editKeyToLog = this.state.profile.editing.key;
    const user = data;
    const profile = this.state.profile;
    profile.errorMsg = null;
    profile.loading = false;
    profile.editing = {key: null, data: null};
    this.setState({profile, user});
    log(profileEditLog(editKeyToLog))
  }

  submitProfileEditFailed(reason) {
    const profile = this.state.profile;
    profile.errorMsg = reason || "error";
    profile.loading = false;
    this.setState({profile});
  }

  cancelProfileEdit() {
    const profile = this.state.profile;
    profile.editing = {key: null, data: null};
    profile.loading = false;
    profile.errorMsg = null;
    this.setState({profile});
  }

  /** @param {string} street */
  getGoogleDataFromStreet(street, region = "hk") {
    street = street.replace(/\s/g, "+");
    const googleUrl = "https://maps.googleapis.com/maps/api/geocode/" +
                "json?" +
                "region=" + region +
                "&address=" + street +
                "&key=AIzaSyDqDJTU7suCklbnStTcieulgVHci8myzcQ";
    return exRequest(googleUrl).then(res => res.json())
  }
}

export default UserStore;
