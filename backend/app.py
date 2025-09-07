from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # CORS ruxsat berish

# Telegram bot sozlamalari
BOT_TOKEN = "8424241985:AAEE4bZklixWHXU21ohBq_iiTwVMaUHKYk4"
CHAT_ID = "5459394614"
TELEGRAM_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

@app.route("/send", methods=["POST"])
def send_message():
    try:
        data = request.json
        kubi = data.get("kubi")
        ogirlik = data.get("ogirlik")
        ism = data.get("ism")
        telefon = data.get("telefon")

        # Ma'lumotlarni formatlash
        message = (
            f"📦 Yangi buyurtma:\n"
            f"🔹 Kub hajmi: {kubi} m³\n"
            f"⚖ Og‘irligi: {ogirlik} kg\n"
            f"👤 Mijoz: {ism}\n"
            f"📞 Telefon: {telefon}"
        )

        # Telegram botga yuborish
        payload = {
            "chat_id": CHAT_ID,
            "text": message
        }
        response = requests.post(TELEGRAM_URL, json=payload)

        if response.status_code == 200:
            return jsonify({"success": True, "message": "Yuborildi!"})
        else:
            return jsonify({"success": False, "message": "Telegramga yuborishda xatolik"}), 500

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
