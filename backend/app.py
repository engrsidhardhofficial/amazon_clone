from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

@app.route('/')
def home():
    return jsonify({"message": "Amazon Clone Backend Running"})

@app.route('/products')
def get_products():
    try:
        url = f"{SUPABASE_URL}/rest/v1/products?select=*"
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        user_email = data.get('email')
        amount = data.get('amount')
        items = data.get('items')

        order_data = {
            "user_email": user_email,
            "amount": amount,
            "items": items
        }

        url = f"{SUPABASE_URL}/rest/v1/orders"
        response = requests.post(url, headers=HEADERS, json=order_data)
        response.raise_for_status()
        
        return jsonify(response.json() if response.content else {}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
