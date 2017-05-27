import 'whatwg-fetch';

// import Variable from './var';

/** @return {string} */
const getToken = () => (localStorage.getItem("authToken") || null);

// export const baseUrl = "https://dev.hjobs.hk/";
// export const baseUrl = "http://localhost:9080/";
export const baseUrl = "https://api.hjobs.hk/";

/** param httpMethod defaults to 'GET', data defaults to null
* @param {string} urlSuffix
* @param {'GET'|'POST'|'PATCH'|'DELETE'} httpMethod
* @return {Promise<Response>}
*/
export const request = (urlSuffix, httpMethod = "GET", data = null) => {
  const url = baseUrl + 'employee/' + urlSuffix;
  const token = getToken();
  /** @type {RequestInit} */
  const obj = {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!!token) obj.headers.Authorization = token;
  if (!!data) obj.body = JSON.stringify(data);
  console.log(["inside http.js, url, obj", url, obj, data]);

  return fetch(url, obj);
};

/** param httpMethod defaults to 'GET', data defaults to null
* @param {string} url @param {'GET'|'POST'|'PATCH'|'DELETE'} httpMethod @param {object} data
* @return {Promise<Response>}
*/
export const exRequest = (url, httpMethod = "Get", data = null) => {
  /** @type {RequestInit} */
  const obj = {
    method: httpMethod
  };
  if (!!data) obj.body = JSON.stringify(data);
  return fetch(url, obj);
};

/** @param {{name: string, action: string, job_id: number, page: string, component: string, target: string}} data */
export const log = (data) => {
  if (localStorage.getItem("developer") === "true") return null;
  const token = getToken();
  const url = baseUrl + "employee/logs";
  /** @type {RequestInit} */
  const obj = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({log: data})
  };
  if (!!token) { obj.headers.Authorization = token; }
  return fetch(url, obj).then(res => res.json()).then(d => {
    console.log(d);
  });
};

const Http = {
  baseUrl,
  token: () => getToken(),
  request,
  exRequest,
  log
};

export default Http;
