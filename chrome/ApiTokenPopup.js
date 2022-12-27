/** 
 *  Copyright [2022] [Amlan]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * 
**/

chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  var result = document.getElementById("results");
});
function printResults() {
  clearResults();
}

function clearResults() {
  results.innerHTML = "";
}

chrome.webRequest.onSendHeaders.addListener(
  function (details) {
    // alert(JSON.stringify(details));
    // alert(details.url + " : " + details.url.indexOf("insureka") > 0);
    // if (details.url.indexOf("insureka") > 0) {
    let result = document.getElementById("results");
    var headers = details.requestHeaders;
    console.log(JSON.stringify(headers));
    let header_keys = "";
    for (let i = 0; i < headers.length; i++) {
      var header = headers[i];
      header_keys += header.name;
      if (header.name == "Authorization") {
        // clear old token if got a new one
        results.innerHTML = "";
        console.log(
          "********************************Got authorization header********************************"
        );
        let authorizationToken = header.value;

        const url = new URL(details.url);
        const domain = url.hostname;
        result.innerHTML += "<b>" + domain + "</b>";
        result.innerHTML += "<br>";
        result.innerHTML += "<br>";
        result.innerHTML += header.name;
        result.innerHTML += authorizationToken;
      }
    }

    console.log("================================");
    // }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame", "xmlhttprequest"],
  },
  ["requestHeaders"]
);

document
  .getElementById("live_headers_link")
  .addEventListener("click", launchLiveHeaders, false);

function launchLiveHeaders(e) {
  e.preventDefault();

  chrome.tabs.create({
    url: chrome.extension.getURL("headersLive.html"),
  });
}
