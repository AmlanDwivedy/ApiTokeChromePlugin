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
    var headers = details.requestHeaders;
    console.log(JSON.stringify(headers));
    let header_keys = "";
    for (let i = 0; i < headers.length; i++) {
      // alert("Headers: " + JSON.stringify(headers));
      var header = headers[i];
      header_keys += header.name;
      header_keys += "--------------------------------";
      if (header.name == "Authorization") {
        console.log(
          "********************************Got authorization header********************************"
        );
        // alert(header.value);
        let authorizationToken = header.value;
        let result = document.getElementById("results");
        result.textContent = header.name + ": " + authorizationToken;
      }
      // alert(header_keys);
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
