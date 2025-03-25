import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import openai
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes (for cross-origin requests)
CORS(app)

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# API route to handle user input and get AI response
@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get user message from the POST request
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Send user message to OpenAI API to get a response using ChatCompletion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can use the model you prefer here
            messages=[
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )

        # Get the AI's reply from the response
        ai_reply = response['choices'][0]['message']['content'].strip()

        # Return the AI response to the frontend
        return jsonify({'response': ai_reply})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Run the app on localhost:5000
if __name__ == '__main__':
    app.run(debug=True)
