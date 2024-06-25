const EXTENSION_ID = "chibebbaajpcnjnnmacjngefcoginbhe";
const EXTENSION_URL = "https://lukaszsiepsiak.github.io/myExtension/update.xml";
const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour
// background.js or service_worker.js
chrome.runtime.onInstalled.addListener(() => {
  console.log(`Extension with ID: ${EXTENSION_ID} Installed`);
});

// Function to check for updates
async function checkForExtensionUpdate() {
  console.log(`Checking for updates for extension with ID: ${EXTENSION_ID}`);

  const response = await fetch(EXTENSION_URL);
  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  const latestVersion = xmlDoc
    .querySelector("updatecheck")
    .getAttribute("version");

  chrome.management.getSelf((extensionInfo) => {
    const currentVersion = extensionInfo.version;
    if (currentVersion !== latestVersion) {
      notifyUserAboutUpdate(latestVersion);
    }
  });
}

// Function to notify the user about the update
function notifyUserAboutUpdate(latestVersion) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Extension Update Available",
    message: `A new version (${latestVersion}) of the extension is available.`,
    buttons: [{ title: "Update Now" }],
    priority: 0,
  });

  chrome.notifications.onButtonClicked.addListener(
    (notificationId, buttonIndex) => {
      if (buttonIndex === 0) {
        chrome.runtime.reload();
      }
    }
  );
}

// Check for updates periodically
setInterval(checkForExtensionUpdate, UPDATE_CHECK_INTERVAL);
checkForExtensionUpdate();

// chrome.notifications.onButtonClicked.addListener(
//   (notificationId, buttonIndex) => {
//     if (buttonIndex === 0) {
//       chrome.runtime.reload();
//     }
//   }
// );

// chrome.runtime.onStartup.addListener(() => checkForUpdate());
// chrome.runtime.onInstalled.addListener(() => checkForUpdate());

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "checkVersion") {
//     checkForUpdate((updateAvailable) => sendResponse({ updateAvailable }));
//     return true; // Keep the message channel open for sendResponse
//   }
// });
