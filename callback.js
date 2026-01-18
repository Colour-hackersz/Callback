export default function handler(req, res) {
  const { userid, amount } = req.query; // URL params

  if (!userid || !amount) {
    return res.status(400).json({ error: "missing parameters" });
  }

  // ================================
  // 🔹 CALL YOUR BOT API HERE
  // ================================
  
  const botToken = "YOUR_BOT_TOKEN";
  const command = `/add ${userid} ${amount}`;
  
  // Use Telegram sendMessage to bot for internal processing
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: YOUR_ADMIN_CHAT_ID,
      text: command
    })
  }).catch(err => console.log("Bot Call Error:", err));

  return res.status(200).json({ status: "ok", userid, amount });
}