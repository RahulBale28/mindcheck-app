const BASE_URL = 'http://127.0.0.1:8000'

export async function signUp(name: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function logIn(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function saveCheckIn(user_id: string, mood_index: number, stress_score: number, intention: string) {
  const res = await fetch(`${BASE_URL}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, mood_index, stress_score, intention }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getHistory(user_id: string) {
  const res = await fetch(`${BASE_URL}/checkins/${user_id}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
