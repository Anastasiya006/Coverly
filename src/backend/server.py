import openai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Set up Flask app
app = Flask(__name__)

# Enable CORS for the React frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Updated API call format for OpenAI Chat API (using v1/chat/completions)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Or use 'gpt-4' if available
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},  # Optional system message
                {"role": "user", "content": user_message}  # User's message
            ]
        )

        # Extract the reply from the response
        reply = response['choices'][0]['message']['content'].strip()
        return jsonify({"reply": reply})

    except Exception as e:
        print("Error:", str(e))  # Print the error to the terminal
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5003)
