@echo off
REM yt_dlp_extension.json の絶対パスを取得
for %%I in ("%~dp0..\yt_dlp_extension.json") do set "EXTENSION_JSON=%%~fI"

REM レジストリキーを追加
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\yt_dlp_extension" /ve /t REG_SZ /d "%EXTENSION_JSON%" /f