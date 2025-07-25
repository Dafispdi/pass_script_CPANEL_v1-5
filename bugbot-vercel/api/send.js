import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const { nomor, mode, apikey } = req.body
  if (!nomor || !mode || !apikey) return res.status(400).json({ error: 'Missing parameter' })

  const apikeyPath = path.resolve('./apikey.json')
  const senderPath = path.resolve('./sender.json')
  const apikeys = JSON.parse(readFileSync(apikeyPath))
  const senders = JSON.parse(readFileSync(senderPath))

  if (!apikeys[apikey]) return res.status(403).json({ error: 'Invalid API Key' })
  if (apikeys[apikey].used >= apikeys[apikey].limit) return res.status(403).json({ error: 'API limit exceeded' })

  const availableSenders = senders.filter(s => s.apikey === apikey)
  if (availableSenders.length === 0) return res.status(403).json({ error: 'No sender paired for this API Key' })

  const sender = availableSenders[Math.floor(Math.random() * availableSenders.length)]

  // Kirim ke BOT WhatsApp local/online handler
  await fetch("http://localhost:5000/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender.id,
      to: nomor,
      message: `BUG MODE: ${mode}`
    })
  })

  apikeys[apikey].used++
  writeFileSync(apikeyPath, JSON.stringify(apikeys, null, 2))

  return res.status(200).json({ success: true, sender: sender.id, to: nomor })
}
