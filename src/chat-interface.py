#!/usr/bin/env python3
import requests
import json

NGROK_URL = input("Enter your ngrok URL (e.g. https://xxxx.ngrok.io): ").strip().rstrip("/")

print("=== Shoplite RAG Chat ===")
print("Type your question. Type /quit to exit.\n")

while True:
    q = input("> ").strip()
    if not q:
        continue
    if q.lower() in {"/quit", "quit", "exit"}:
        print("Bye!")
        break

    try:
        resp = requests.post(
            NGROK_URL + "/chat",
            headers={"Content-Type": "application/json"},
            data=json.dumps({"message": q}),
            timeout=60,
        )
        resp.raise_for_status()
        data = resp.json()
        print("\nAnswer:", data.get("answer", "[no answer]"))
        if "sources" in data:
            print("Sources:", data["sources"])
        print()
    except Exception as e:
        print("Error:", e)
        continue
