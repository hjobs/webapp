import tStrings from "../stores/data/translations"

/**
 * @typedef {'traffic-red' | 'traffic-orange' | 'traffic-blue' | null} trafficString
 * @typedef {{id: number, optionalAttributes: any}} objectWithId
 */
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const jobTypes = [
  {value: "quick", jobSearchName: "Quick Jobs"},
  {value: "stable", jobSearchName: "Stable Jobs"},
  {value: "intern", jobSearchName: "Internsips"},
  {value: "project", jobSearchName: "Projects"}
];
export const urgencyTypes = [
  {value: "urgent1", className: "traffic-red"},
  {value: "urgent2", className: "traffic-orange"},
  {value: "urgent3", className: "traffic-blue"}
];

/** @return {number} - 2 digit @param {number} num - 1 to 2 digit */
export const pad2 = (num) => { return (num < 10) ? '0' + num.toString() : num; };
/** @return {"Jan"| "Feb"| "Mar"| "Apr"| "May"| "Jun"| "Jul"| "Aug"| "Sep"| "Oct"| "Nov"| "Dec"} @param {0|1|2|3|4|5|6|7|8|9|10|11} num */
export const getMonth = (num) => { return months[num]; };
/** @param {Date} date @return {string} */
export const timeStamp = (date) => { return pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ", " + pad2(date.getDate()) + "-" + pad2(date.getMonth() + 1) + "-" + date.getFullYear(); };
/** @param {Date} date @return {string} */
export const dateStamp = (date) => { return date.getDate() + " " + getMonth(date.getMonth()) + ", " + date.getFullYear().toString().slice(2); };
/** */
export const getEmptyJobExp = () => { return {
  position: "",
  description: "",
  time_from: "",
  time_to: "",
  location: "",
  working: "",
  org: "",
  company_name: ""
}; };
export const geolocationMappingObject = [
  {fromKey: "street_number", to: "street_number"},
  {fromKey: "route", to: "street_name"},
  {fromKey: "country", to: "country"},
  {fromKey: "administrative_area_level_1", to: "region"},
  {fromKey: "neighborhood", to: "city"}
];

/** @return {trafficString} @param {*} job */
export const getColorClass = (job) => {
  let colorClass;
  if (!!job.periods && job.periods.length > 0) {
    const earliestDate = job.periods.reduce((result, curr) => {
      let currTime;
      if (!!curr.start_time) currTime = new Date(curr.start_time);
      else if (!!curr.date) currTime = new Date(curr.date);
      else return result || null;
      return (!result || currTime - result < 0) ? currTime : result;
    }, null);
    if (!earliestDate) return urgencyTypes[2].className;

    const now = new Date();
    const daysDifference = (earliestDate - now) / 86400000; // 86400000 = 1 day
    if (daysDifference < 0) colorClass = urgencyTypes[2].className;
    else if (daysDifference < 7) colorClass = urgencyTypes[0].className;
    else if (daysDifference < 14) colorClass = urgencyTypes[1].className;
    else colorClass = urgencyTypes[2].className;
  } else {
    colorClass = urgencyTypes[2].className;
  }
  return colorClass;
};

/** return current translation object */
export const getTStrings = () => {
  return tStrings[localStorage.getItem("locale") || "en"];
};

/** @return {'? to ?'|'?'|'negotiable'} */
export const getSalaryDescription = (job) => {
  let salaryDescription = "";
  const addUnit = str => (!job.salary_unit ? str : (str += " /" + job.salary_unit));
  switch (job.salary_type) {
    case "range":
      salaryDescription = addUnit(job.salary_low + " - " + job.salary_high);
      break;
    case "specific":
      salaryDescription = addUnit(job.salary_value);
      break;
    case "negotiable": default:
      salaryDescription = "negotiable";
      break;
  }
  return salaryDescription;
};

const Variable = {
  /** @type [{name: string, value: string}] - name is for displaying, use value in algorithm */
  jobTypes,
  urgencyTypes,
  pad2, getMonth, timeStamp, dateStamp, getEmptyJobExp,
  getTStrings,
  getColorClass,
  getSalaryDescription,

  /**
   * @return {string} email
   * @param {'application'|'contactus'} type
   */
  getEmailStr: (type, data) => {
    let str;
    switch (type) {
      case "application": {
        if (data) {
          const orgName = this.getOrgsNames(data.orgs, true);
          const email = this.getOrgsEmails(data.orgs);
          const title = (data.title + ' - Hjobs.hk').replace(/\s|\r/g, "%20");

          const body =
            ("Dear " + orgName + ",%0A%0A" +
            "I am interested in your posting " + data.title + ". Please contact me at: (ENTER YOUR INFO HERE)%0A%0A" +
            "Look forward to your speedy reply," +
            "%0A(YOUR NAME HERE)").replace(/\s|\r/g, "%20");

          str =
            'mailto:' + email +
            '?subject=RE%20' + title +
            '&body=' + body;
        }
        break;
      }
      case "contactus": {
        str =
          'mailto:info@hjobs.hk' +
          '?subject=RE%20' +
          'Inquiry'.replace(" ", "%20") +
          '&body=' +
          'Let us know what your inquiry is :)'.replace(" ", "%20");
        break;
      }
      default: break;
    }

    return str || null;
  },

  /** if encode === true, replace & with %26 @param {any[]} orgs @param {boolean} encode*/
  getOrgsNames: (orgs, encode = false) => {
    let orgNameArr = [];
    if (encode) orgNameArr = orgs.map(org => org.name.replace("&", "%26"));
    else orgNameArr = orgs.map(org => org.name);
    return orgNameArr.join(", ");
  },

  getOrgsEmails: (orgs) => {
    const orgEmailArr = orgs.map(org => org.email);
    return orgEmailArr.join(",");
  },

  /**
   * get index in arr by comparing against ids,
   * @return {'-1'|number}
   * @param {objectWithId} data @param {objectWithId[]} arr
   */
  indexOfDataInArray: (data, arr) => {
    if (!data || !arr) { throw Error('no data or no arr'); }
    return arr.reduce((result, curr, i) => {
      if (curr.id === data.id) return i;
      return result;
    }, -1);
  },

  profileEditStateTriggered:(pathname) => {
    return /^\/profile\/edit/i.test(pathname);
  }
};

export default Variable;
