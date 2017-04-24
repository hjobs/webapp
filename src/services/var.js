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

const Variable = {
  /** @type [{name: string, value: string}] - name is for displaying, use value in algorithm */
  jobTypes,
  urgencyTypes,

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
   * @return {trafficString}
   * @param {*} job
   */
  getColorClass: (job) => {
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
  },

  /** @return {number} - 2 digit @param {number} num - 1 to 2 digit */
  pad2: (num) => { return (num < 10) ? '0' + num.toString() : num; },
  /** @return {"Jan"| "Feb"| "Mar"| "Apr"| "May"| "Jun"| "Jul"| "Aug"| "Sep"| "Oct"| "Nov"| "Dec"} @param {0|1|2|3|4|5|6|7|8|9|10|11} num */
  getMonth: (num) => { return months[num]; },

  /** @return {'? to ?'|'?'|'negotiable'} */
  getSalaryDescription(job) {
    let salaryDescription = "";
    const addUnit = str => (!job.salary_unit ? str : (str += " /" + job.salary_unit));
    switch (job.salary_type) {
      case "range":
        salaryDescription = addUnit(job.salary_high + " - " + job.salary_low);
        break;
      case "specific":
        salaryDescription = addUnit(job.salary_value);
        break;
      case "negotiable": default:
        salaryDescription = "negotiable";
        break;
    }
    return salaryDescription;
  },

  /**
   * get index in arr by comparing against ids,
   * @return {'-1'|number}
   * @param {objectWithId} data @param {objectWithId[]} arr
   * @param {'narrowArr'} dataStructure
   */
  indexOfDataInArray: (data, arr, dataStructure = "narrowArr") => {
    if (!data || !arr) { throw Error('no data or no arr'); }
    switch (dataStructure) {
      case "narrowArr": {
        return arr.reduce((result, curr, i) => {
          if (curr.id === data.id) return i;
          return result;
        }, -1);
      }
      default: {
        return -1;
      }
    }
  }
};

export default Variable;
