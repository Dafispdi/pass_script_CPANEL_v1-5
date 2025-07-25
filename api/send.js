export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { nomor, mode } = req.body;
  if (!nomor || !mode) return res.status(400).json({ error: "Missing fields" });

  try {
    const response = await fetch("http://localhost:5000/api/wa-bug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomor, mode })
    });

    const data = await response.json();
    return res.status(200).json({ success: true, nomor });
  } catch (err) {
    return res.status(500).json({ error: "Gagal kirim ke bot" });
  }
}
