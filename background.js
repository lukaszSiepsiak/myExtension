const extensionVersion = chrome.runtime.getManifest().version;
const updateUrl =
  "https://lukaszsiepsiak.github.io/myExtension/extension-version.json"; // URL where the version info is stored

function checkForUpdate(callback) {
  fetch(updateUrl)
    .then((response) => response.json())
    .then((data) => {
      const updateAvailable = data.version !== extensionVersion;
      if (callback) callback(updateAvailable);
      if (updateAvailable) notifyUser();
    })
    .catch((error) => console.error("Error checking for update:", error));
}

function notifyUser() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Extension Update Available",
    message: "A new version of the extension is available. Click to update.",
    buttons: [{ title: "Update Now" }],
  });
}

chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      chrome.runtime.reload();
    }
  }
);

chrome.runtime.onStartup.addListener(() => checkForUpdate());
chrome.runtime.onInstalled.addListener(() => checkForUpdate());

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "checkVersion") {
    checkForUpdate((updateAvailable) => sendResponse({ updateAvailable }));
    return true; // Keep the message channel open for sendResponse
  }
});
