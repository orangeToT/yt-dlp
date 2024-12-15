chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download") {
    const { url, presetIndex } = message;

    chrome.storage.sync.get("presets", (data) => {
      if (!data.presets || !data.presets[presetIndex]) {
        sendResponse({ success: false, error: "無効なプリセットです。" });
        return;
      }

      const preset = data.presets[presetIndex];
      const command = {
        url: url,
        format: preset.format,
        output: preset.output,
      };

      chrome.runtime.sendNativeMessage(
        "yt_dlp_extension",
        command,
        (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            sendResponse(response);
          }
        }
      );
    });

    return true; // 非同期レスポンスのためチャンネルを維持
  }
});

