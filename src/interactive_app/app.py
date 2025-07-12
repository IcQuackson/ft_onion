from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/echo", methods=["POST"])
def echo():
    data = request.json
    return jsonify(message=f"You said: {data.get('text', '')}")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
