const extensionVersion = chrome.runtime.getManifest().version;
const updateUrl =
  "https://github.com/lukaszSiepsiak/myExtension/blob/main/extension-version.json"; // URL where the version info is stored

function checkForUpdate() {
  fetch(updateUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.version !== extensionVersion) {
        notifyUser();
      }
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

chrome.runtime.onStartup.addListener(checkForUpdate);
chrome.runtime.onInstalled.addListener(checkForUpdate);
