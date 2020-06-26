# Lyrid JavaScript SDK
A NPM package that consume [Lyrid](https://lyrid.io/) functions.

## Requirements

To use this SDK, you will need:

- [Node.js **v6.3.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Build from code
`npm install`

`npm run-script build`

The resulting outputs are:

.\lib\lyrid.js - For react compatible js build

.\dist\lyrid.js - For running on any javascript engine

## Installation

### Node.js

By default the latest build will be automatically pushed into npm, and user will be able to install and use it as following:

`npm i lyrid-js-sdk`

`import Lyrid from 'lyrid-js-sdk'`

### Use the SDK as single js file

We also deliver our Javascript compatible build into our CDN:

```html
<script src="https://storage.googleapis.com/zeta-d1/js/lyrid.js" type="text/javascript"></script>
```

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises),
making it easier to handle the asynchronous requests made to the API. The SDK
provides a `Lyrid` object containing several methods which map to the
calls and parameters described in
[Lyrid REST API](https://api.lyrid.io/swagger/index.html).

The following snippet is a generic example of how to use the SDK. If you need
details for a specific module, refer to the
[samples](https://github.com/darian68/sdk-react-sample).

Before executing any request, you need to provide key and secret to the API:


#### Create Lyrid object

```js
const lyrid = new Lyrid(<key>, <secret>);
```

#### Making requests

```js
    lyrid.execute(<function ID>, <framework>, <input>).then(data =>{
      console.log(data);
    }, () =>{
      console.log("Error on execute function");
    });
```

