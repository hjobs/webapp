class Variable {
  constructor() {
    // this.baseUrl = "http://api.hjobs.hk:9080/";
    // this.baseUrl = "http://dev.hjobs.hk:9080/";
    this.baseUrl = "http://localhost:9080/";
  }

  /**
   * return email string
   *
   * (type): application, contactus
   */
  getEmailStr(type, data) {
    let str;
    switch (type) {
      case "application": {
        if (data) {
          const orgName = this.getOrgsNames(data.orgs);
          const email = this.getOrgsEmails(data.orgs);
          const title = (data.title + ' - Hdatas.hk').replace(/\s|\r/g, "%20");

          const body =
            ("Dear " + orgName + ",%0A%0A" +
            "I am interested in your data " + data.title + ". Please contact me at: (ENTER YOUR INFO HERE)%0A%0A" +
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
  }

  getOrgsNames(orgs) {
    const orgNameArr = orgs.map(org => org.name.replace("&", "%26"));
    return orgNameArr.join(", ");
  }

  getOrgsEmails(orgs) {
    const orgEmailArr = orgs.map(org => org.email);
    return orgEmailArr.join(",");
  }

  /**
   * returns 'traffic-red', 'traffic-orange', 'traffic-blue' or null
   * @param {*} job
   */
  getColorClass(job) {
    let colorClass;
    if (job.job_type === 'quick') {
      if (!!job.dates) {
        const firstDate = new Date(job.dates[0]);
        const now = new Date();
        const daysDifference = (firstDate - now) / 86400000;
        if (daysDifference < 7) colorClass = 'traffic-red';
        else if (daysDifference < 14) colorClass = "traffic-orange";
        else colorClass = "traffic-blue";
      } else {
        colorClass = 'traffic-blue';
      }
    }

    return colorClass;
  }
}

export default Variable;
