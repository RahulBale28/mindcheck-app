from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SECRET_KEY"))
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class CheckInRequest(BaseModel):
    user_id: str
    mood_index: int
    stress_score: int
    intention: str

@app.get("/")
def root():
    return {"status": "MindCheck API running"}

@app.post("/signup")
def signup(req: SignUpRequest):
    existing = supabase.table("users").select("*").eq("email", req.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(req.password)
    result = supabase.table("users").insert({
        "name": req.name,
        "email": req.email,
        "password_hash": hashed
    }).execute()
    user = result.data[0]
    return {"id": user["id"], "name": user["name"], "email": user["email"]}

@app.post("/login")
def login(req: LoginRequest):
    result = supabase.table("users").select("*").eq("email", req.email).execute()
    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user = result.data[0]
    if not pwd_context.verify(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"id": user["id"], "name": user["name"], "email": user["email"]}

@app.post("/checkin")
def checkin(req: CheckInRequest):
    result = supabase.table("checkins").insert({
        "user_id": req.user_id,
        "mood_index": req.mood_index,
        "stress_score": req.stress_score,
        "intention": req.intention
    }).execute()
    return result.data[0]

@app.get("/checkins/{user_id}")
def get_checkins(user_id: str):
    result = supabase.table("checkins").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data
