@echo off
chcp 65001
REM インストールディレクトリの設定
set "INSTALL_DIR=%~dp0"

REM ダウンローダーのパス設定
set "DOWNLOADER_PATH=%INSTALL_DIR%dist\downloader.exe"

REM パス内のバックスラッシュをエスケープする
set "ESCAPED_DOWNLOADER_PATH=%DOWNLOADER_PATH:\=\\%"

REM エクステンションIDの入力を促す
set /p EXTENSION_ID=Chrome拡張機能のExtension IDを入力してください: 

REM yt_dlp_extension.json を生成
(
    echo {
    echo     "name": "yt_dlp_extension",
    echo     "description": "A native messaging host for yt-dlp",
    echo     "path": "%ESCAPED_DOWNLOADER_PATH%",
    echo     "type": "stdio",
    echo     "allowed_origins": [
    echo         "chrome-extension://%EXTENSION_ID%/"
    echo     ]
    echo }
) > "%INSTALL_DIR%yt_dlp_extension.json"

echo yt_dlp_extension.json が作成されました。

REM register_host.bat を実行
call "%INSTALL_DIR%installer\register_host.bat"

echo インストールが完了しました。
pause