
(function(window){

  // Get the token and store it in localstorage.
  let _initToken = ({key = '', secret = ''}) => {
    const lyridHeaders = new Headers();
    lyridHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({"key":key,"secret":secret});

    const requestOptions = {
      method: 'POST',
      headers: lyridHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.lyrid.io/auth", requestOptions)
        .then(response => response.json())
        .then(result => {
          localStorage.setItem('lyridToken', result.token)
        })
        .catch(error => console.log('error', error));
  };

  // Check if the token is available.
  let _getToken = () => {
    if (localStorage.getItem("lyridToken") !== null) {
        return localStorage.getItem("lyridToken")
    }
  };

  // This will return a promise which must be resolved to get the results.
  let _execute = async ({id = '', framework = '', inputs = ''}) => {
    const token = _getToken();
    const lyridHeaders = new Headers();
    lyridHeaders.append("Content-Type", "application/json");
    lyridHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'POST',
      headers: lyridHeaders,
      body: inputs,
      redirect: 'follow'
    };

    const app_url = "https://api.lyrid.io/api/serverless/app/execute/" + id + "/" + framework;
    const response = await fetch(app_url, requestOptions);
    return await response.json();
  };

  window.Lyrid = {
    initToken:_initToken,
    execute:_execute
  }
})(window);


