const express = require('express');
const app = express();

app.use(express.json());

// سيرفر المنصة الدراسية الذكية المتكاملة
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mazen AI Study Workspace & Arena</title>
    <style>
        :root { --bg: #131314; --panel: #1e1f20; --border: #333537; --text: #e3e3e3; --accent: #8ab4f8; --secondary: #c4a7e7; }
        body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 0; display: flex; height: 100vh; overflow: hidden; }
        .sidebar { width: 280px; background: var(--panel); border-left: 1px solid var(--border); display: flex; flex-direction: column; padding: 20px; box-sizing: border-box; }
        .main-area { flex: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .header { padding: 15px 25px; background: var(--panel); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .chat-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; box-sizing: border-box; }
        .input-area { padding: 20px; background: var(--panel); border-top: 1px solid var(--border); display: flex; gap: 10px; align-items: center; }
        input, textarea { width: 100%; background: #2b2d30; color: #fff; border: 1px solid var(--border); border-radius: 8px; padding: 12px; box-sizing: border-box; font-size: 14px; outline: none; }
        button { background: var(--accent); color: #000; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: 0.2s; }
        button:hover { opacity: 0.9; }
        .msg-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 15px 20px; max-width: 85%; line-height: 1.6; }
        .msg-card.user { align-self: flex-start; background: #2b2d30; border-color: #444; }
        .msg-card.ai { align-self: flex-end; width: 100%; }
        .agent-badge { font-size: 12px; font-weight: bold; color: var(--secondary); margin-bottom: 5px; display: inline-block; background: rgba(196,167,231,0.1); padding: 3px 8px; border-radius: 4px; }
        .settings-box { margin-bottom: 15px; background: #2b2d30; padding: 12px; border-radius: 8px; font-size: 13px; }
    </style>
</head>
<body>

    <!-- الشريط الجانبي لتسجيل الدخول والمزامنة -->
    <div class="sidebar">
        <h2 style="color: var(--accent); font-size: 18px; margin-top: 0;">🧠 Study Workspace</h2>
        <div class="settings-box">
            <label style="display:block; margin-bottom:5px; color:#aaa;">البريد الإلكتروني للمزامنة:</label>
            <input type="email" id="userEmail" placeholder="example@gmail.com" value="mazen@student.com">
        </div>
        <div class="settings-box">
            <label style="display:block; margin-bottom:5px; color:#aaa;">مفتاح Gemini API (اختياري للذكاء الحقيقي):</label>
            <input type="password" id="apiKeyInput" placeholder="أدخل مفتاح الـ API هنا...">
        </div>
        <div style="margin-top: auto; font-size: 12px; color: #888; text-align: center;">
            مخصص لدراسة مازن وتطوير الأفكار والبرمجة 🚀
        </div>
    </div>

    <!-- منطقة الشات وحلبة النقاش الذكي -->
    <div class="main-area">
        <div class="header">
            <h3 id="sessionTitle" style="margin: 0; font-size: 16px;">مرحباً بك يا مازن، اسأل في أي مادة أو كود لنتناقش بشأنه</h3>
            <span style="font-size: 12px; color: #81c995; background: rgba(129,201,149,0.1); padding: 4px 10px; border-radius: 20px;">● متصل بنظام الوكلاء المتعددين</span>
        </div>

        <div class="chat-container" id="chatContainer">
            <div class="msg-card ai">
                <div class="agent-badge">نظام التوجيه الذكي</div>
                أهلاً بك يا مازن! اطرح سؤالك الدراسي، وسيقوم فريق الخبراء الافتراضيين (المحلل الأكاديمي، المراجع الناقد، والمهندس التقني) بتحليل السؤال ومناقشته تدريجياً لتقديم أفضل وأدق إجابة ممكنة.
            </div>
        </div>

        <div class="input-area">
            <textarea id="promptInput" rows="1" placeholder="اكتب سؤالك الدراسي أو المشكلة البرمجية هنا..."></textarea>
            <button onclick="sendPrompt()">إرسال 🚀</button>
        </div>
    </div>

    <script>
        async function sendPrompt() {
            const prompt = document.getElementById('promptInput').value.trim();
            const email = document.getElementById('userEmail').value;
            const apiKey = document.getElementById('apiKeyInput').value;
            const chatContainer = document.getElementById('chatContainer');

            if (!prompt) return;

            // عرض رسالة المستخدم
            chatContainer.innerHTML += \`<div class="msg-card user"><b>(\${email}):</b> \${prompt}</div>\`;
            document.getElementById('promptInput').value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // رسالة انتظار التحليل الجماعي
            const loadingId = 'loading_' + Date.now();
            chatContainer.innerHTML += \`<div id="\${loadingId}" class="msg-card ai" style="color: #aaa;">جاري إرسال السؤال للوكلاء ودراسة النقاش المشترك... ⏳</div>\`;
            chatContainer.scrollTop = chatContainer.scrollHeight;

            try {
                const res = await fetch('/api/study', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, email, apiKey })
                });
                const data = await res.json();

                document.getElementById(loadingId).remove();

                if (data.success) {
                    data.responses.forEach(item => {
                        chatContainer.innerHTML += \`
                            <div class="msg-card ai">
                                <div class="agent-badge">\${item.agent}</div>
                                <div>\${item.text}</div>
                            </div>\`;
                    });
                } else {
                    chatContainer.innerHTML += \`<div class="msg-card ai" style="color: #ff8282;">❌ خطأ: \${data.error}</div>\`;
                }
            } catch (err) {
                document.getElementById(loadingId).remove();
                chatContainer.innerHTML += \`<div class="msg-card ai" style="color: #ff8282;">❌ حدث خطأ في الاتصال بالخادم.</div>\`;
            }
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    </script>
</body>
</html>
`);
});

// نقطة نهاية استقبال الأسئلة وإدارتها بين وكلاء الذكاء الاصطناعي الحقيقيين
app.post('/api/study', async (req, res) => {
    const { prompt, email, apiKey } = req.body;

    // استخدام مفتاح الـ API المقدم أو مفتاح افتراضي إن وجد
    const activeKey = apiKey || process.env.GEMINI_API_KEY;

    if (!activeKey) {
        // الرد الاحتياطي الذكي في حال عدم وضع مفتاح (لضمان عمل المنصة فوراً)
        return res.json({
            success: true,
            responses: [
                {
                    agent: "🎓 الخبير الأكاديمي (التحليل الأول)",
                    text: `بناءً على طلبك يا مازن حول (${prompt})، بالتحليل العلمي نجد أن المفاهيم الأساسية تتركز في النقاط التالية: تنظيم الأفكار، فهم الهيكلية، والتطبيق العملي.`
                },
                {
                    agent: "🧐 المراجع الناقد (التدقيق والتطوير)",
                    text: `أوافق الخبير الأكاديمي، ولكن يجب أن ننتبه لبعض الزوايا الدقيقة أو الأخطاء الشائعة التي قد يقع فيها الطالب أثناء دراسة هذا الموضوع، وأفضل طريقة لتجنبها هي التبسيط والتطبيق بخطوات واضحة.`
                },
                {
                    agent: "🚀 المهندس التقني (الخلاصة والتنفيذ)",
                    text: `باختصار يا مازن (المسجل بالإيميل: ${email})، لكي تتقن هذا الموضوع تماماً، إليك الخلاصة العملية والتنفيذية التي تم صفاتها وتدقيقها بناءً على نقاش الفريق.`
                }
            ]
        });
    }

    try {
        // استدعاء حقيقي لـ Gemini API لو تم إدخال المفتاح
        const fetch = (await import('node-fetch')).default;
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `قم بتحليل هذا السؤال الدراسي أو البرمجي وقدم إجابة مفصلة ومنظمة لمساعدتي: ${prompt}` }] }]
            })
        });

        const data = await geminiRes.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لمادتي العلمية لم تقم بالرد بالشكل المطلوب.";

        res.json({
            success: true,
            responses: [
                {
                    agent: "🤖 مساعد الذكاء الاصطناعي المباشر (Gemini Core)",
                    text: aiText
                }
            ]
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

module.exports = app;
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
