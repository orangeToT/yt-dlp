# YT-DLP in Chrome Extension
[English](README_en.md) | Japanese

> [!NOTE]
> この拡張機能は現在、Windows環境のChromeにおいてのみ利用できます。

- [YT-DLP in Chrome Extension](#yt-dlp-in-chrome-extension)
  - [説明](#説明)
  - [インストール](#インストール)
    - [Windows](#windows)
    - [MacおよびLinux](#macおよびlinux)
    - [コンパイル](#コンパイル)
  - [使用方法](#使用方法)
    - [設定](#設定)
    - [ダウンロード](#ダウンロード)
  - [アンインストール](#アンインストール)

## 説明
この拡張機能は、Pythonで作成されたyt-dlpというインターネット上のストリーミング動画をダウンロードするソフトウェアを、ブラウザの拡張機能から直接利用できるようにしたものです。個人利用を目的に作成したため、完成度は高くありません。利用方法は [使用方法](#使用方法)を参照してください。

## インストール

### Windows

1. このリポジトリをクローンします。
2. ブラウザのアドレスバーに `chrome://extensions/` と入力し、右上のデベロッパーモードを有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」から、クローンしたフォルダを選択します。
4. すべての拡張機能からYT-DLP DownloaderのIDをコピーします。
5. クローンしたフォルダ内の `installer.bat` を実行し、プロンプトにコピーしたIDを入力します。
6. 拡張機能のリロードボタンを押下します。これでインストール完了です。

### MacおよびLinux

現在リリースされていません。

### コンパイル

Pythonが必要です。  
クローンしたリポジトリ内で以下のコマンドを実行します：

```bash
python -m venv .venv
.venv\Scripts\activate.bat
pip install -r requirements.txt
pyinstaller --onefile scripts/downloader.py --noconsole
```

これで実行ファイルが生成されます。

## 使用方法

### 設定

ブラウザ右上の拡張機能から設定ボタンを押します。  
プリセットのTitle, Format, Outputはそれぞれ `yt-dlp {url} -f {format} -o {output}` に対応します。（Titleは識別用）

### ダウンロード

ダウンロードしたい動画を開いた状態で、ブラウザの拡張機能からプリセットを選択し、Downloadを押します。

## アンインストール

フォルダ内の `installer\unregister_host.bat` を実行した後、ブラウザから拡張機能を削除します。
