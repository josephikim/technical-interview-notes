// AJAX (methods also provided by jQuery standard)
// Although X in Ajax stands for XML, JSON is preferred over XML nowadays because of its many advantages such as being a part of JavaScript, thus being lighter in size. Both JSON and XML are used for packaging information in the Ajax model.

// XMLHttpRequest API
// The XMLHttpRequest API is the core of Ajax.

function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function () {
      resolve(xhr);
    });

    xhr.addEventListener("error", reject);
    xhr.open("GET", url, true);
    xhr.send();
  });
}

function clickTest(url, req, res) {
  res.setHeader("Content-Type", "text/javascript");
  res.write(
    "(" +
      function () {
        var div = document.querySelector("div");

        div.addEventListener("click", function () {
          div.innerHTML = "clicked";
        });

        var xhr = new XMLHttpRequest();
        var ajax = document.querySelector(".ajax"); // return first element that matches specific selector e.g. className="ajax"

        ajax.addEventListener("click", function () {
          xhr.open("GET", "/ajax", true);
          xhr.send();
        });

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            ajax.innerHTML = xmlhttp.responseText;
          }
        };
      }.toString() +
      ")(window)"
  );
  res.end();
}

// Fetch API
// One significant advantage Fetch has over XMLHttpRequest is that it leverages PROMISES, allowing for a simpler and cleaner API while avoiding callback hell. Fetch also provides a single logical place to define other HTTP-related concepts such as CORS and extensions to HTTP.

// Using with Node.js
const fetch = require("isomorphic-fetch"); // or ("cross-fetch") or ("node-fetch")

const getCountry = async (countryCode) => {
  const response = await fetch("http://restcountries.eu/rest/v2/all");

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to fetch the country");
  }
};

getCountry("GB")
  .then((data) => {
    console.log(data.nativeName);
  })
  .catch((e) => {
    console.log(e);
  });

// GET request
fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

// GET request w/ auth token (Bearer)
fetch("{url}", {
  headers: {
    Authorization: "Basic {token}",
  },
}).then((response) => console.log(response));

// GET request w/ querystring data
fetch("{url}?var1=value1&var2=value2").then((response) =>
  console.log(response)
);

// GET request w/ CORS
fetch("{url}", {
  mode: "cors",
}).then((response) => console.log(response));

// POST request with options
fetch("/data.json", {
  method: "post",
  body: new FormData(form), // post body
  body: JSON.stringify({ myjson: "data" }),

  headers: {
    Accept: "application/json",
  },

  credentials: "same-origin", // send cookies
  credentials: "include", // send cookies, even in CORS
});

// POST request with form data
let formData = new FormData();
formData.append("field1", "value1");
formData.append("field2", "value2");

fetch("{url}", {
  method: "post",
  body: formData,
}).then((response) => console.log(response));

// POST request w/ JSON data
fetch("{url}", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    field1: "value1",
    field2: "value2",
  }),
}).then((response) => console.log(response));

// Response options
fetch("/data.json").then((res) => {
  res.text(); // response body (=> Promise)
  res.json(); // parse via JSON (=> Promise)
  res.status; //=> 200
  res.statusText; //=> 'OK'
  res.redirected; //=> false
  res.ok; //=> true
  res.url; //=> 'http://site.com/data.json'
  res.type; //=> 'basic'
  //   ('cors' 'default' 'error'
  //    'opaque' 'opaqueredirect')

  res.headers.get("Content-Type");
});

// Catching errors
// Non-2xx responses are still successful requests. Use another function to turn them to errors.
fetch("/data.json").then(checkStatus);

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    let err = new Error(res.statusText);
    err.response = res;
    throw err;
  }
}

// Fetch with Async/Await
async function getData() {
  let data = await fetch(url);
  // process the response
}

// Async makes it easier to reason about returned data
async function getData() {
  var dataObj;

  const response = await fetch(url);
  const data = await response.json();
  dataObj = data;
  console.log(dataObj);
}

// Axios
// One significant advantage - code required to call an API using axios is pretty clean and simple. Also provides more functionality than some of the other packages. For example, cancel requests (useful to use within componentWillUnmount()). The main reason why people tend to not want to use axios is that the bundle size is a lot larger compared to cross-fetch or isomorphic-fetch.
const axios = require("axios");

// Make a request for a user with a given ID
axios
  .get("http://restcountries.eu/rest/v2/all")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
