#!/usr/bin/env python3
"""
Simple HTTP server for local testing of the portfolio website
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Change to the directory containing the static files
os.chdir(Path(__file__).parent)

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # Serve index.html for all routes (SPA behavior)
        if self.path == '/':
            self.path = '/index.html'
        elif not os.path.exists(self.path[1:]) and not self.path.startswith('/static'):
            self.path = '/index.html'
        
        return super().do_GET()

def run_server():
    """Start the local development server"""
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Portfolio server running at http://localhost:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("🔥 Next-gen AI Security Portfolio is live!")
            print("💡 Press Ctrl+C to stop the server")
            print("-" * 50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()