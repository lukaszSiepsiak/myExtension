document?.addEventListener("DOMContentLoaded", () => {
  const manifest = chrome.runtime.getManifest();
  document.getElementById("extension-name").innerText = manifest.name;
  document.getElementById("extension-version").innerText =
    "Version: " + manifest.version;
});

document?.getElementById("updateButton")?.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "checkForUpdate" });
});
