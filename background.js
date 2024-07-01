const EXTENSION_ID = "chibebbaajpcnjnnmacjngefcoginbhe";
const EXTENSION_URL = "https://lukaszsiepsiak.github.io/myExtension/update.xml";

chrome.runtime.onInstalled.addListener(() => {
  // Set an alarm to check for updates every hour
  chrome.alarms.create("checkForUpdate", { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkForUpdate") {
    checkForUpdate();
  }
});

function checkForUpdate() {
  fetch(chrome.runtime.getManifest().update_url)
    .then((response) => response.text())
    .then((xmlText) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xmlText, "text/xml");
      let latestVersion = xmlDoc
        .getElementsByTagName("updatecheck")[0]
        .getAttribute("version");

      if (
        compareVersions(chrome.runtime.getManifest().version, latestVersion)
      ) {
        // Logic to prompt user or automatically update
        console.log("New version available: ", latestVersion);
      }
    })
    .catch((err) => console.error("Error checking for updates:", err));
}

function compareVersions(currentVersion, latestVersion) {
  const current = currentVersion.split(".").map(Number);
  const latest = latestVersion.split(".").map(Number);

  for (let i = 0; i < latest.length; i++) {
    if (latest[i] > (current[i] || 0)) return true;
    if (latest[i] < (current[i] || 0)) return false;
  }
  return false;
}
