// middleware/auth.js
export async function verifyApiKey(req) {
  const key = req.headers.authorization?.split(' ')[1]
  const validKeys = [process.env.API_KEY_1, process.env.API_KEY_2]
  return validKeys.includes(key)
}