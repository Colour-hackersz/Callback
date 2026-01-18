export default async function handler(req, res) {
  try {
    const data = req.body;

    // Log incoming callback for debugging
    console.log("Callback Data:", data);

    // REQUIRED FIELDS FROM OXAPAY
    const track_id = data.track_id;
    const status = data.status; // Example: "Paid"
    const amount = data.amount;
    const order_id = data.order_id; // We used: PAY-<userid>-<amount>

    // Extract user.id from order_id format: PAY-12345678-5
    const parts = order_id.split("-");
    const userId = parts[1];  // <userid>
    const userAmount = parts[2]; // <amount like 5,10,20,50>

    // Only proceed if payment is completed
    if (status === "Paid") {
      console.log("Payment confirmed for user:", userId);

      // TELEGRAM BOT API
      const BOT_TOKEN = process.env.BOT_TOKEN;
      const chatId = userId;

      // Determine mode based on amount
      let mode = "";
      if (userAmount == 10) mode = "v2";
      if (userAmount == 20) mode = "v3";
      if (userAmount == 50) mode = "v4";

      // Run /done command
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: chatId,
          text: `/done ${mode}`,
          parse_mode: "Markdown"
        })
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log("Callback ERROR:", err);
    res.status(500).json({ ok: false, error: err.toString() });
  }
}
