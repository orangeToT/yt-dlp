document.addEventListener("DOMContentLoaded", () => {
    const presetSelect = document.getElementById("preset");
    const downloadButton = document.getElementById("download");
    const openSettingsButton = document.getElementById("open-settings");
  
    // Load presets from storage
    chrome.storage.sync.get("presets", (data) => {
      const presets = data.presets || [];
      presets.forEach((preset, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = preset.name;
        presetSelect.appendChild(option);
      });
    });
  
    downloadButton.addEventListener("click", async () => {
      const presetIndex = presetSelect.value;
  
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
  
        chrome.runtime.sendMessage({
          action: "download",
          url: url,
          presetIndex: presetIndex
        });
      });
    });
  
    openSettingsButton.addEventListener("click", () => {
      chrome.runtime.openOptionsPage();
    });
  });