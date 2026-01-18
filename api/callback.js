export default async function handler(req, res) {
  try {
    const body = req.body;

    // Debug logging (optional)
    console.log("OXAPAY CALLBACK RECEIVED:", body);

    if (!body || !body.status || !body.order_id) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const status = body.status;
    const order_id = body.order_id;

    // parse order_id format: "PAY-<userId>-<amount>"
    const parts = order_id.split("-");
    if (parts.length < 3) {
      return res.status(400).json({ ok: false, error: "Invalid order_id format" });
    }

    const userId = parts[1];        // Telegram user ID
    const amount = parseFloat(parts[2]) || 0;

    console.log("Parsed callback:", { status, userId, amount });

    // Only proceed for Paid status
    if (status === "Paid") {

      // Hardcoded bot token — replace with your bot token below
      const BOT_TOKEN = "8569356669:AAGEDZm8sm_qZuUPu8T33xp2V92k35YsVY0";

      // Determine done parameter by amount
      let mode = "";
      if (amount == 10) mode = "v2";
      if (amount == 20) mode = "v3";
      if (amount == 50) mode = "v4";

      // Run /done with or without mode
      const commandText = mode ? `/done ${mode}` : "/done";

      // Call Telegram sendMessage with the /done text
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: userId,
          text: commandText
        })
      });

      console.log("Called /done for:", { userId, mode });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
}
