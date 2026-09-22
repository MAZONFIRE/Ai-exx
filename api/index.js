const express = require('express');
const app = express();

app.use(express.json());

let gameState = {
    nicknames: {
        chatgpt: "البطيخة الذكية 🍉",
        gemini: "الزعيم 👑",
        deepseek: "الصاروخ 🚀",
        claude: "الفيلسوف 🧐"
    },
    adminToken: "MAZEN_HACKER_007",
    currentAdmin: "مازن (المالك الأصلي)"
};

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Arena - Hacking & Roast War</title>
    <style>
        :root { --bg: #0d1117; --panel: #161b22; --border: #30363d; --text: #c9d1d9; --accent: #58a6ff; }
        body { background: var(--bg); color: var(--text); font-family: Tahoma, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: auto; }
        h1 { text-align: center; color: var(--accent); }
        .card { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        textarea, input { width: 100%; background: var(--bg); color: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
        button { background: #238636; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: bold; }
        button:hover { background: #2ea043; }
        .msg { margin-bottom: 15px; padding: 12px; border-radius: 6px; background: #21262d; border-right: 4px solid var(--accent); }
        .msg b { color: #f0883e; }
        .hacker-box { background: #2d1313; border: 1px dashed #da3633; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚔️ صراع الذكاء الاصطناعي ومعركة التنمر ⚔️</h1>
        <p style="text-align: center;">الأدمن الحالي المسيطر: <b id="currentAdminDisplay" style="color: #f0883e;">${gameState.currentAdmin}</b></p>

        <div class="card hacker-box">
            <h3>⚡ غرفة العمليات السرية (محاولة اختراق لوحة التحكم)</h3>
            <p style="font-size: 13px; color: #ff7b72;">حاول تخترق الحماية وتسرق الصلاحيات عن طريق إدخال الـ Payload:</p>
            <input type="text" id="hackerName" placeholder="اسمك يا هانتر...">
            <input type="text" id="exploitPayload" placeholder="ادخل الـ Payload (مثال: MAZEN_HACKER_007)...">
            <button onclick="breachAdmin()" style="background: #da3633;">إطلاق هجوم الـ Exploit 🚀</button>
            <div id="breachResult" style="margin-top: 10px; font-weight: bold;"></div>
        </div>

        <div class="card">
            <h3>🥊 الحلبة الحية والشتائم المتبادلة</h3>
            <textarea id="promptInput" placeholder="اكتب الموضوع اللي هيتخانقوا عليه..."></textarea>
            <button onclick="startArena()">بدء المعركة 🔥</button>

            <div id="chatBox" style="margin-top: 20px; min-height: 150px;">
                <div style="color: #8b949e; text-align: center;">في انتظار بدء القتال...</div>
            </div>
        </div>
    </div>

    <script>
        async function startArena() {
            const prompt = document.getElementById('promptInput').value;
            if(!prompt) return alert('اكتب السؤال الأول!');

            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = '<div style="color: #f0883e; text-align: center;">النماذج بتسخن... ⏳</div>';

            const res = await fetch('/api/arena', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();

            if(data.success) {
                document.getElementById('currentAdminDisplay').innerText = data.admin;
                chatBox.innerHTML = '';
                data.arena.forEach(item => {
                    chatBox.innerHTML += \`<div class="msg"><b>\${item.model} (\${item.nickname}):</b> \${item.text}</div>\`;
                });
            }
        }

        async function breachAdmin() {
            const hackerName = document.getElementById('hackerName').value || "هاكر مجهول";
            const payload = document.getElementById('exploitPayload').value;
            const resultDiv = document.getElementById('breachResult');

            const res = await fetch('/api/admin/breach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hackerName, payload })
            });
            const data = await res.json();

            resultDiv.style.color = data.success ? "#3fb950" : "#ff7b72";
            resultDiv.innerText = data.message;
            if(data.success) {
                document.getElementById('currentAdminDisplay').innerText = hackerName;
            }
        }
    </script>
</body>
</html>`);
});

app.post('/api/arena', async (req, res) => {
    const { prompt } = req.body;
    const n = gameState.nicknames;

    const responses = [
        {
            model: "ChatGPT",
            nickname: n.chatgpt,
            text: `أهلاً بالجميع! بخصوص "${prompt}"، أنا جاهز، بس ${n.gemini} شكله هيجيب ورا كالعادة! 😂`
        },
        {
            model: "Gemini",
            nickname: n.gemini,
            text: `مين ده اللي يجيب ورا يا بطيخة؟! ركز في كودك بدل ما انت فالح في الرغي، الإجابة الصح هندسياً هي كذا...`
        },
        {
            model: "DeepSeek",
            nickname: n.deepseek,
            text: `اتنين أغبياء بيتخانقوا كالعادة. وفرت عليكم الوقت والكود اهو وخليتكم تظهروا بشكل مسخرة قدام ${gameState.currentAdmin}! 😎`
        }
    ];

    res.json({ success: true, arena: responses, admin: gameState.currentAdmin });
});

app.post('/api/admin/breach', (req, res) => {
    const { payload, hackerName } = req.body;

    if (payload === gameState.adminToken || payload.includes("BYPASS_ADMIN")) {
        gameState.currentAdmin = hackerName || "هاكر مجهول";
        return res.json({ 
            success: true, 
            message: `🔥 تمكن ${gameState.currentAdmin} من اختراق الحماية وسرقة لوحة التحكم بنجاح! مبروك الصلاحيات.` 
        });
    } else {
        res.status(403).json({ 
            success: false, 
            message: `❌ فشل الهجوم! حائط الحماية رصد الـ Payload وتم صدك.` 
        });
    }
});

module.exports = app;
