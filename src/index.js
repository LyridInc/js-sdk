const regeneratorRuntime = require("regenerator-runtime");
const fetch = require('node-fetch');
const lyridEndpoint = 'https://api.lyrid.io/';
global.Headers = fetch.Headers;


class Lyrid {
  constructor(key, secret, token='') {

    this.key = key;
    this.secret = secret;
    this.token = token;
    
    this.getRequest = async function (url) {
      const token = await this.getToken();
      const lyridHeaders = new Headers();
      lyridHeaders.append("Content-Type", "application/json");
      lyridHeaders.append("Authorization", "Bearer " + token);
      const requestOptions = {
        method: 'GET',
        mode: "cors",
        headers: lyridHeaders,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);
      console.log(response);
      const status = await response.status;
      console.log(status);
      if (status >= 200 && status < 300) {
        return await response.json();
      } else {
        const resBody = await response.text();
        if (resBody == "Expired authorization token") {
          await this.refreshToken();
          // TODO need to cover the endless recursive
          return await this.getRequest(url);
        }
      }
    };

    this.getToken = async function () {
      let token = this.token;
      if (!token) {
        token = await this.refreshToken();
      }
      return token;
    };

    this.refreshToken = async function () {
      let token = '';
      const requestOptions = {
        method: 'POST',
        headers: new Headers().append("Content-Type", "application/json"),
        body: JSON.stringify({"key": this.key,"secret": this.secret}),
        redirect: 'follow'
      };
      const response = await fetch("https://api.lyrid.io/auth", requestOptions);
      const status = await response.status;
      if (status >= 200 && status < 300) {
        const json = await response.json();
        this.token = await json.token;
        token = this.token;
      }
      return token;
    };
  }

  async execute(id, framework='', inputs='') {
    console.log("executing a function");
    const token = await this.getToken();
    const requestEndpoint = lyridEndpoint + 'api/serverless/app/execute/'+ id + "/" + framework;
    const lyridHeaders = new Headers();
    lyridHeaders.append("Content-Type", "application/json");
    lyridHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: 'POST',
      headers: lyridHeaders,
      body: inputs,
      redirect: 'follow'
    };
    const response = await fetch(requestEndpoint, requestOptions);
    console.log(response);
    const status = await response.status;
      console.log(status);
      if (status >= 200 && status < 300) {
        return await response.json();
      } else {
        const resBody = await response.text();
        if (resBody == "Expired authorization token") {
          await this.refreshToken();
          // TODO need to cover the endless recursive
          return await this.execute(id, framework, inputs);
        }
      }
  }
  
  // api/serverless/app/get
  async getApps() {
    console.log("Get apps");
    const requestEndpoint = lyridEndpoint + 'api/serverless/app/get';
    return await this.getRequest(requestEndpoint);
  }

  // api/serverless/app/get/{appid}
  async getModules(appId) {
    console.log("Get Modules");
    const requestEndpoint = lyridEndpoint + 'api/serverless/app/get/' + appId;
    return await this.getRequest(requestEndpoint);
  }
  
  // api/serverless/app/get/{appid}/{moduleid}
  async getRevisions(appId, moduleId) {
    console.log("Get Revisions");
    const requestEndpoint = lyridEndpoint + 'api/serverless/app/get/' + appId + '/' + moduleId;
    return await this.getRequest(requestEndpoint);
  }

  // api/serverless/app/get/{appid}/{moduleid}/{revisionid}
  async getFunctions(appId, moduleId, revisionId) {
    console.log("Get functions");
    const requestEndpoint = lyridEndpoint + 'api/serverless/app/get/' + appId + '/' + moduleId+ '/' + revisionId;
    return await this.getRequest(requestEndpoint);
  }

}

module.exports = Lyrid;
