from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

fetch_counter = 0
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/greeting")
async def root():
    global fetch_counter
    fetch_counter+=1
    return {"message": f"Hello, World! (from the backend) ({fetch_counter})"}
