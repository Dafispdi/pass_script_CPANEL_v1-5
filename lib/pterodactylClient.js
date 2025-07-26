// lib/pterodactylClient.js
export async function sendPterodactylCommand(command) {
  const res = await fetch(`https://panel.domain.com/api/client/servers/${process.env.PTERO_SERVER_ID}/command`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PTERO_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command })
  })

  const data = await res.json()
  return data
}