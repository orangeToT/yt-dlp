# YT-DLP in Chrome Extension

English | [Japanese](README.md)

> [!NOTE]
> This extension is currently available only for Chrome on Windows environments.

- [YT-DLP in Chrome Extension](#yt-dlp-in-chrome-extension)
  - [Description](#description)
  - [Installation](#installation)
    - [Windows](#windows)
    - [Mac and Linux](#mac-and-linux)
    - [Compilation](#compilation)
  - [Usage](#usage)
    - [Settings](#settings)
    - [Download](#download)
  - [Uninstallation](#uninstallation)

## Description
This extension allows you to use yt-dlp, a software developed in Python for downloading streaming videos from the internet, directly from your browser's extension. It was created for personal use, so it may not be highly polished. Please refer to the [Usage](#usage) section for instructions.

## Installation

### Windows

1. Clone this repository.
2. Enter `chrome://extensions/` in your browser's address bar and enable Developer Mode at the top right.
3. Click on "Load unpacked" and select the cloned folder.
4. Copy the ID of the YT-DLP Downloader from all extensions.
5. Run `installer.bat` inside the cloned folder and enter the copied ID when prompted.
6. Click the reload button on the extension. Installation is complete.

### Mac and Linux

Currently not released.

### Compilation

Python is required.  
Execute the following commands within the cloned repository:

```bash
python -m venv .venv
.venv\Scripts\activate.bat
pip install -r requirements.txt
pyinstaller --onefile scripts/downloader.py --noconsole
```

This will generate the executable file.

## Usage

### Settings

Press the settings button from the extensions on the top right of the browser.  
Preset Title, Format, and Output correspond to `yt-dlp {url} -f {format} -o {output}` respectively. (Title is for identification)

### Download

Open the video you want to download, select a preset from the browser extension, and press Download.

## Uninstallation

After running `installer\unregister_host.bat` inside the folder, remove the extension from the browser. 