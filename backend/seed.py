import os
import requests
import json
from dotenv import load_dotenv
from products_data import products

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Error: SUPABASE_URL or SUPABASE_KEY not found in .env")
    exit(1)

# Construct the REST API URL
# Assuming SUPABASE_URL is like https://xyz.supabase.co
api_url = f"{url}/rest/v1/products"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def seed_products():
    print("Seeding products...")
    
    # Prepare data
    products_to_insert = []
    for product in products:
        p_data = product.copy()
        if 'id' in p_data:
            del p_data['id']
        products_to_insert.append(p_data)

    try:
        response = requests.post(api_url, headers=headers, json=products_to_insert)
        response.raise_for_status()
        print("Seeding complete!")
    except requests.exceptions.RequestException as e:
        print(f"Error seeding products: {e}")
        if response is not None:
             print(f"Response text: {response.text}")

if __name__ == "__main__":
    seed_products()
