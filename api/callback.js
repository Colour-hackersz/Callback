export default function handler(req, res) {
  try {
    const { userid, amount } = req.query;

    if (!userid || !amount) {
      return res.status(400).json({ error: "Missing userid or amount" });
    }

    // HARD-CODED VALUES
    const BOT_TOKEN = "8130539719:AAGnIZSlYg8P8m3WqYl3w5tryS421BmYAJU";
    const OWNER_ID = "7312879030";

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const text = `/add ${userid} ${amount}`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_ID,
        text: text
      })
    });

    return res.status(200).json({
      ok: true,
      userid,
      amount,
      note: "Callback processed"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.toString()
    });
  }
}
