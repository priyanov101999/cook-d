from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Establish DB connection
db_connection = pymysql.connect(
    host="localhost",
    user="root",
    password="password",
    database="hackathon"
)

def calculate_macronutrients(ingredients_list):
    total_calories = 0
    total_protein = 0
    total_fat = 0
    total_carbs = 0

    cursor = db_connection.cursor()

    for ingredient, quantity in ingredients_list:
        cursor.execute("""
            SELECT serving_size, calories, protein, fat, carbs
            FROM grocery_data
            WHERE name = %s
        """, (ingredient,))
        result = cursor.fetchone()

        if result:
            serving_size, calories, protein, fat, carbs = result
            if serving_size > 0:
                scale_factor = quantity / serving_size
                total_calories += calories * scale_factor
                total_protein += protein * scale_factor
                total_fat += fat * scale_factor
                total_carbs += carbs * scale_factor
            else:
                print(f"Warning: Serving size for {ingredient} is zero or invalid.")
        else:
            print(f"Warning: Ingredient {ingredient} not found in the database.")

    return {
        'total_calories': total_calories,
        'total_protein': total_protein,
        'total_fat': total_fat,
        'total_carbs': total_carbs
    }

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    print(f"{data}")
    if not data or 'ingredients' not in data:
        return jsonify({'error': 'Invalid input. Ingredients data missing'}), 400

    ingredients = data.get("ingredients", [])
    ingredients_list = [(ingredient['name'], ingredient['quantity']) for ingredient in ingredients]

    macronutrients = calculate_macronutrients(ingredients_list)

    return jsonify(macronutrients)

if __name__ == '__main__':
    app.run(debug=True)
