from flask import Flask, request, render_template, jsonify
from llama_cpp import Llama

app = Flask(__name__)

llm = Llama(
    model_path="tinyllama-1.1b-chat-v0.3.Q2_K.gguf",
    n_ctx=512,
    n_threads=4
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_input = request.json["message"]
    prompt = f"User: {user_input}\nAssistant:"
    result = llm(prompt, max_tokens=256, stop=["User:", "Assistant:"], echo=False)
    reply = result["choices"][0]["text"].strip()
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run()
