import os
import requests
from flask import Flask, request, jsonify, render_template
from llama_cpp import Llama

MODEL_URL = "https://huggingface.co/spaces/Etherealinkbytiisetso/Titibrainchat/resolve/main/tinyllama-1.1b-chat-v0.3.Q2_K.gguf"
MODEL_FILE = "tinyllama-1.1b-chat-v0.3.Q2_K.gguf"

# Download model if missing
if not os.path.exists(MODEL_FILE):
    print("Downloading model...")
    with requests.get(MODEL_URL, stream=True) as r:
        with open(MODEL_FILE, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
    print("Model downloaded ✅")

# Load the model
llm = Llama(model_path=MODEL_FILE, n_ctx=512, n_threads=4)

# Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_message = request.json["message"]
    prompt = f"User: {user_message}\nAssistant:"
    output = llm(prompt, max_tokens=256, stop=["User:", "Assistant:"], echo=False)
    reply = output["choices"][0]["text"].strip()
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
