from fastapi import FastAPI
from numpy import rec
import requests
import json

app = FastAPI()

def get_all_meals():

    all_dishes = []
    dishes_json = ""
    records = []
    

@app.get("/recipes/{meal_name}")
async def get_recipe(meal_name: str):
    response = requests.get(f"https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}")
    response_json = response.json()
    meal = response_json['meals'][0]
    recipe = meal['strInstructions']
    ingredients = meal
    thumbnail = meal['strMealThumb']
    Youtube_link = meal['strYoutube']
    preference = meal['strCategory']
    cuisine = meal['strArea']
    
    ingredients_dict = {}
    for i in range(1,21):
        if(meal["strIngredient"+str(i)] != "" and meal["strIngredient"+str(i)] != None):
            ingredients_dict[meal["strIngredient"+str(i)]] = meal['strMeasure'+str(i)]



@app.get("recipes/{meal_name}/ingredients/alternatives")
async def get_ingredient_alternatives(meal_name: str):
    # Implementation for getting ingredient alternatives
    pass
