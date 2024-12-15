@echo off
REM レジストリキーを削除
REG DELETE "HKCU\Software\Google\Chrome\NativeMessagingHosts\yt_dlp_extension" /f
echo Native Messaging Host unregistered.
pause