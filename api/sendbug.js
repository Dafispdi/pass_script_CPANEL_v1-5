// pages/api/send-bug.js
// pages/api/send-bug.js
module.exports = function handler(req, res) {
  res.json({ success: true });
}
import { verifyApiKey } from '/middleware/auth'
import { sendPterodactylCommand } from '/lib/pterodactylClient'

export default async function handler(req, res) {
  const valid = await verifyApiKey(req)
  if (!valid) return res.status(401).json({ error: 'Invalid API Key' })

  const { target, type, repeat } = req.body
  if (!target || !type) return res.status(400).json({ error: 'Missing params' })

  const cmd = `node bot.js --target=${target} --type=${type} --repeat=${repeat || 1}`
  const result = await sendPterodactylCommand(cmd)

  res.json({ success: true, sent: result })
}
