from flask import Flask, request, redirect

app = Flask(__name__)

@app.route("/")
def redirect_link():
    target = request.args.get("url")

    if not target:
        return "Missing url parameter", 400

    return redirect(target, code=302)
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
