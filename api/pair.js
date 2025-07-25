import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const { sender, apikey } = req.body
  if (!sender || !apikey) return res.status(400).json({ error: 'Missing parameters' })

  const apikeyPath = path.resolve('./apikey.json')
  const senderPath = path.resolve('./sender.json')
  const apikeys = JSON.parse(readFileSync(apikeyPath))
  const senders = JSON.parse(readFileSync(senderPath))

  if (!apikeys[apikey]) return res.status(403).json({ error: 'Invalid API Key' })
  if (senders.find(s => s.id === sender)) return res.status(409).json({ error: 'Sender already paired' })

  senders.push({ id: sender, apikey })
  writeFileSync(senderPath, JSON.stringify(senders, null, 2))

  return res.status(200).json({ success: true, sender })
}
