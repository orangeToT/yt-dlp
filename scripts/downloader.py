import os
import sys
import json
import struct
import subprocess
import logging

# ログの設定を修正
logging.basicConfig(
    filename= os.getcwd() + '\\downloader.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s',
    encoding='utf-8'  # エンコーディングをUTF-8に指定
)

def read_message():
    logging.debug('メッセージ読み込み開始')
    raw_length = sys.stdin.buffer.read(4)
    if len(raw_length) == 0:
        logging.debug('メッセージ長が0。スクリプトを終了します。')
        sys.exit(0)
    message_length = struct.unpack('<I', raw_length)[0]
    logging.debug(f'受信メッセージ長: {message_length}')
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    logging.debug(f'受信メッセージ: {message}')
    return json.loads(message)

def send_message(message_content):
    message_json = json.dumps(message_content)
    message_bytes = message_json.encode('utf-8')
    sys.stdout.buffer.write(struct.pack('<I', len(message_bytes)))
    sys.stdout.buffer.write(message_bytes)
    sys.stdout.buffer.flush()
    logging.debug('レスポンス送信完了')

def execute_yt_dlp(url, format, output):
    command = [
        'yt-dlp',
        '-f', format,
        '--no-playlist',
        '-o', output + "\\%(title)s.%(ext)s",
        url
    ]
    
    logging.debug(f'yt-dlp コマンド: {" ".join(command)}')
    
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode == 0:
            logging.debug('yt-dlp 実行成功')
            return {'success': True, 'output': result.stdout}
        else:
            logging.error(f'yt-dlp 実行失敗: {result.stderr}')
            return {'success': False, 'error': result.stderr}
    except Exception as e:
        logging.exception('yt-dlp 実行中に例外が発生')
        return {'success': False, 'error': str(e)}

def main():
    while True:
        try:
            message = read_message()
            url = message.get('url')
            format = message.get('format', 'best')
            output = message.get('output', os.path.expanduser('~\\Videos\\yt-dlp'))

            if not url:
                logging.warning('URLが提供されていません。')
                send_message({'success': False, 'error': 'URLが提供されていません。'})
                continue

            response = execute_yt_dlp(url, format, output)
            send_message(response)

        except Exception as e:
            logging.exception('メインループ中に例外が発生')
            send_message({'success': False, 'error': str(e)})

if __name__ == "__main__":
    logging.debug('ダウンローダースクリプト開始')
    main()