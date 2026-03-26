const tools = {
    'json-format': {
        title: 'JSON Suite',
        html: `<textarea id="input" placeholder="Paste JSON here..."></textarea>
               <div class="actions">
                   <button class="btn-action" onclick="runTool('json-format')">Beautify</button>
                   <button class="btn-action" onclick="runTool('json-minify')">Minify</button>
               </div>`
    },
    'jwt-inspect': {
        title: 'JWT Debugger',
        html: `<textarea id="input" placeholder="Paste JWT token..."></textarea>
               <div class="actions">
                   <button class="btn-action" onclick="runTool('jwt-decode')">Decode</button>
               </div>`
    },
    'base64': {
        title: 'Base64',
        html: `<textarea id="input" placeholder="Text..."></textarea>
               <div class="actions">
                   <button class="btn-action" onclick="runTool('b64-encode')">Encode</button>
                   <button class="btn-action" onclick="runTool('b64-decode')">Decode</button>
               </div>`
    },
    'hash': {
        title: 'SHA-256',
        html: `<input type="text" id="input" placeholder="String...">
               <button class="btn-action" onclick="runTool('hash-256')">Hash</button>`
    },
    'uuid': {
        title: 'UUID Gen',
        html: `<button class="btn-action" onclick="runTool('gen-uuid')">Generate UUID V4</button>`
    }
};

function init() {
    const container = document.getElementById('tool-container');
    let menuHtml = '<div class="menu">';
    for (const key in tools) {
        menuHtml += `<button class="menu-btn" id="btn-${key}" onclick="loadTool('${key}')">${tools[key].title}</button>`;
    }
    menuHtml += '</div><div class="workspace" id="active-tool"></div>';
    container.innerHTML = menuHtml;
    loadTool('json-format');
    initParticles();
}

function loadTool(key) {
    const tool = tools[key];
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${key}`).classList.add('active');
    document.getElementById('active-tool').innerHTML = `
        <h2 style="margin-bottom:1rem; font-family:'Space Grotesk'">${tool.title}</h2>
        ${tool.html}
        <h3 style="margin: 1.5rem 0 0.5rem; font-size:0.7rem; color:var(--text-dim); text-transform:uppercase;">Output</h3>
        <pre id="output">_</pre>
    `;
}

async function runTool(action) {
    const input = document.getElementById('input')?.value || '';
    const out = document.getElementById('output');
    try {
        switch(action) {
            case 'json-format': out.textContent = JSON.stringify(JSON.parse(input), null, 4); break;
            case 'json-minify': out.textContent = JSON.stringify(JSON.parse(input)); break;
            case 'jwt-decode': out.textContent = JSON.stringify(JSON.parse(atob(input.split('.')[1])), null, 4); break;
            case 'b64-encode': out.textContent = btoa(input); break;
            case 'b64-decode': out.textContent = atob(input); break;
            case 'hash-256':
                const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
                out.textContent = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
                break;
            case 'gen-uuid': out.textContent = crypto.randomUUID(); break;
        }
    } catch (e) { out.textContent = "Error: " + e.message; }
}

function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.onresize = resize; resize();
    class P {
        constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.vX = (Math.random()-0.5)*0.2; this.vY = (Math.random()-0.5)*0.2; this.s = Math.random()*1.5; }
        draw() { ctx.fillStyle = 'rgba(56, 189, 248, 0.2)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill(); this.x+=this.vX; this.y+=this.vY; if(this.x<0||this.x>canvas.width) this.x=0; if(this.y<0||this.y>canvas.height) this.y=0; }
    }
    for(let i=0; i<70; i++) particles.push(new P());
    const anim = () => { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>p.draw()); requestAnimationFrame(anim); };
    anim();
}

init();
