import requests
import string
from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
import json
def get_all_meals():

    all_dishes = []
    records = []
    
    for letter in string.ascii_lowercase:
        response = requests.get(f"https://www.themealdb.com/api/json/v1/1/search.php?f={letter}")
        data = response.json()
        if data['meals']:
            for meal in data['meals']:
                meal_name = meal['strMeal']
                meal_category = meal['strCategory']
                meal_area = meal['strArea']
                meal_ingredients = []
                for i in range(1, 21):
                    meal_ingredient = meal[f'strIngredient{i}']
                    if meal_ingredient:
                        meal_ingredients.append(meal_ingredient)
                all_dishes.append(str(meal_name) + " " + " " + str(meal_category) + " " + str(meal_area) + " " + " ".join(meal_ingredients))
    count = 0
    list_itr = -1
    while count < len(all_dishes):
        records.append([])
        list_itr += 1
        for i in range(0,96):
            if count == len(all_dishes):
                break
            records[list_itr].append({"_id": str(count), "chunk_text": all_dishes[count],"category": "meal name"})
            count += 1
    return records




def main():
    load_dotenv()

    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

    pc = Pinecone(api_key=PINECONE_API_KEY)

    index_name = "morsels-dishes"
    
    if not pc.has_index(index_name):
        pc.create_index_for_model(
            name=index_name,
            cloud="aws",
            region="us-east-1",
            embed={
                "model": "llama-text-embed-v2",
                "field_map": {"text": "chunk_text"}
            },
        )
        
    index = pc.index(index_name)
    
    records = get_all_meals()
    
    for record in records:
        index.upsert_records(
        namespace="dishes",
        records=record
    )
        
if __name__ == "__main__":
    main()

     