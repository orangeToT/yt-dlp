document.addEventListener("DOMContentLoaded", () => {
    const presetsDiv = document.getElementById("presets");
    const addPresetButton = document.getElementById("add-preset");
  
    // プリセットの表示関数
    function renderPresets() {
        chrome.storage.sync.get(["presets"], (data) => {
            presetsDiv.innerHTML = ""; // 既存のプリセットをクリア

            (data.presets || []).forEach((preset, index) => {
                const presetDiv = document.createElement("div");
                presetDiv.className = "preset-item";
                
                const presetInfo = document.createElement("span");
                presetInfo.textContent = `タイトル: ${preset.name}, フォーマット: ${preset.format}, 出力先: ${preset.output}`;
                
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "削除";
                deleteButton.addEventListener("click", () => {
                    deletePreset(index);
                });
                
                presetDiv.appendChild(presetInfo);
                presetDiv.appendChild(deleteButton);
                presetsDiv.appendChild(presetDiv);
            });
        });
    }

    // プリセット削除関数
    function deletePreset(index) {
        chrome.storage.sync.get("presets", (data) => {
            const presets = data.presets || [];
            presets.splice(index, 1); // 指定したインデックスのプリセットを削除
            chrome.storage.sync.set({ presets }, () => {
                renderPresets(); // プリセットの再描画
            });
        });
    }

    // プリセット追加イベント
    addPresetButton.addEventListener("click", (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防止
        const name = prompt("プリセット名:");
        if (!name) return;
        const format = prompt("フォーマット (例: best):");
        if (!format) return;
        const output = prompt("出力先:");
        if (!output) return;

        chrome.storage.sync.get("presets", (data) => {
            const presets = data.presets || [];
            presets.push({ name, format, output });
            chrome.storage.sync.set({ presets }, () => {
                renderPresets(); // プリセットの再描画
            });
        });
    });

    // 初期プリセットの描画
    renderPresets();
});
