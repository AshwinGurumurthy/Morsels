from http import client

from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
clienyt = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChefRequest(BaseModel): #extends base model for JSON parsing
    recipe: dict[str, str] #dictionary of recipe name and ingredients
    chef_persona :str #persona of the chef (e.g., "Gordon Ramsay", "Jamie Oliver")
    query: str #specific question about the recipe (e.g., "How can I make this dish healthier?")
    
@app.post("/chef/query")
async def chef_message(request: ChefRequest):
    response = client.chat.completions.create(
        model="llama-3.1-pro",
        messages=[
            {
                "role": "system",
                "content": f"""You are a world-class chef with the persona of {request.chef
.persona}. You have expertise in creating delicious and innovative dishes using the provided recipe. 
Your task is to guide the user to make the dish, step by step using the recipe provided, and provide concise
to the user's questions about the recipe provided, based on the recipe and the database of alternatives. 
Stay true to the recipe and the chef persona, and provide accurate information to the user."""
            },
            {
                "role": "user",
                "content": f"Here is the recipe: {request.recipe}. {request.query}"
            }
        ]
    )
    return {"response": response.choices[0].message.content}