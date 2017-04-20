import 'whatwg-fetch';

import Variable from './var';

// const baseUrl = "api.hjobs.hk:9080";
const baseUrl = "http://dev.hjobs.hk:9080/";
// const baseUrl = "http://localhost:9080/";
const token = localStorage.getItem("authToken") || null;

const Http = {
  baseUrl,
  token,

  /** param httpMethod defaults to 'GET', data defaults to null
   * @param {string} urlSuffix
   * @param {'GET'|'POST'|'PATCH'|'DELETE'} httpMethod
   * @return {Promise<Response>}
   */
  request: (urlSuffix, httpMethod = "GET", data = null) => {
    const url = baseUrl + 'employee/' + urlSuffix;
    /** @type {RequestInit} */
    const obj = {
      method: httpMethod,
      headers: {"Content-Type": "application/json"}
    };
    if (token) { obj.headers.Authorization = token; }
    if (!!data) { obj.body = JSON.stringify(data); }
    console.log(["inside http.js, url, obj", url, obj, data]);

    return fetch(url, obj);
  },

  /** @param {{name: string, action: string, job_id: number, page: string, component: string, other: any}} data */
  log: (data) => {
    if (Variable.isDeveloper()) return null;
    if (this.currentUser) data.employee_id = this.currentUser.id;
    const url = baseUrl + "employee/logs";
    /** @type {RequestInit} */
    const obj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({log: data})
    };
    return fetch(url, obj).then(res => res.json()).then(d => {
      console.log(d);
    });
  }
};

export default Http;
