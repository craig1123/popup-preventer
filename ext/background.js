chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === "clearCookies") {
    chrome.cookies.getAll({ domain: request.domain }, function (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: "https://" + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
        });
      }
    });
  }
});
