import nodemailer from 'nodemailer'

const smtpAccounts = {
  gmail1: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "akunbussidanjay@gmail.com",
      pass: "zjog awba gllj edsi"
    }
  },
  gmail2: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "akunanjayselebewpret@gmail.com",
      pass: "oqwa qsip hxvj mfpo"
    }
  },
  smtp1: {
    host: "smtp.yourhost.com",
    port: 587,
    secure: false,
    auth: {
      user: "youruser@yourhost.com",
      pass: "yourpassword"
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { fromAccount, to, subject, message } = req.body;
  if (!fromAccount || !to || !subject || !message)
    return res.status(400).json({ error: "Missing required fields" });

  const smtp = smtpAccounts[fromAccount];
  if (!smtp) return res.status(400).json({ error: "Unknown sender account" });

  const transporter = nodemailer.createTransport(smtp);

  try {
    await transporter.sendMail({
      from: smtp.auth.user,
      to,
      subject,
      text: message
    });
    res.status(200).json({ success: true, sentFrom: smtp.auth.user });
  } catch (err) {
    res.status(500).json({ error: "Failed to send", detail: err.message });
  }
}
