import os
from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key securely
openai.api_key = os.getenv('OPENAI_API_KEY')

# Enable CORS for all routes (for cross-origin requests)
CORS(app)

# API route to handle user input and get AI response
@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get user message from the POST request
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Send user message to OpenAI API to get a response
        response = openai.Completion.create(
            engine="text-davinci-003",  # Choose the engine you prefer (you can use GPT-3 engines)
            prompt=user_message,
            max_tokens=150,  # Adjust response length
            n=1,
            stop=None,
            temperature=0.7,  # Adjust creativity (higher is more creative)
        )

        # Get the AI's reply from the response
        ai_reply = response.choices[0].text.strip()

        # Return the AI response to the frontend
        return jsonify({'response': ai_reply})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Run the app on localhost:5000
if __name__ == '__main__':
    app.run(debug=True)
