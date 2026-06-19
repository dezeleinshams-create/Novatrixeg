import http.server
import socketserver
import json
import os
import subprocess
import threading

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NexuraAutoServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse the incoming JSON database to verify it
                data = json.loads(post_data.decode('utf-8'))
                
                # Write to database.json on disk with UTF-8 encoding (preserving Arabic)
                db_path = os.path.join(DIRECTORY, 'database.json')
                with open(db_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                
                # Run git commands in the background to not block the server response
                threading.Thread(target=self.run_git_sync).start()
                
                # Respond with success
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                response = {"status": "success", "message": "تم حفظ التعديلات محلياً وتحديث المستودع على GitHub!"}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                response = {"status": "error", "message": str(e)}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def run_git_sync(self):
        try:
            print("[Auto-Sync] Starting GitHub synchronization...")
            # Git add
            subprocess.run(["git", "add", "database.json"], cwd=DIRECTORY, check=True)
            # Git commit
            subprocess.run(["git", "commit", "-m", "Auto-update database.json from local dashboard"], cwd=DIRECTORY, check=True)
            # Git push
            subprocess.run(["git", "push", "origin", "main"], cwd=DIRECTORY, check=True)
            print("[Auto-Sync] Database successfully pushed to GitHub!")
        except Exception as e:
            print(f"[Auto-Sync Error] Failed to sync with GitHub: {e}")

if __name__ == '__main__':
    # Ensure standard simple request handler runs properly
    handler = NexuraAutoServer
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"[Nexura EG] Auto-Server is running on: http://localhost:{PORT}")
        print("[Nexura EG] Open dashboard.html and save edits to auto-save locally and push to GitHub.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.server_close()
