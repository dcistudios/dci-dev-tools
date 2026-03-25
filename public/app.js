const tools = {
    'json-format': {
        title: 'JSON Formatter',
        html: `<textarea id="input" placeholder="Paste messy JSON here..."></textarea>
               <div class="actions">
                   <button onclick="runTool('json-format')">Beautify</button>
                   <button onclick="runTool('json-minify')">Minify</button>
               </div>`
    },
    'base64': {
        title: 'Base64 Converter',
        html: `<textarea id="input" placeholder="Text to Encode/Decode..."></textarea>
               <div class="actions">
                   <button onclick="runTool('b64-encode')">Encode</button>
                   <button onclick="runTool('b64-decode')">Decode</button>
               </div>`
    },
    'hash': {
        title: 'SHA-256 Hasher',
        html: `<input type="text" id="input" placeholder="Enter string...">
               <div class="actions">
                   <button onclick="runTool('hash-256')">Generate Hash</button>
               </div>`
    },
    'uuid': {
        title: 'UUID Generator',
        html: `<div class="actions">
                   <button onclick="runTool('gen-uuid')">Generate Version 4 UUID</button>
               </div>`
    }
};

const container = document.getElementById('tool-container');
const outputHeader = '<h3>Output</h3><pre id="output"></pre>';

// Initialize Sidebar/Menu
function init() {
    let menuHtml = '<div class="menu">';
    for (const key in tools) {
        menuHtml += `<button class="menu-btn" onclick="loadTool('${key}')">${tools[key].title}</button>`;
    }
    menuHtml += '</div><div id="active-tool"></div>';
    container.innerHTML = menuHtml;
    loadTool('json-format');
}

function loadTool(key) {
    const tool = tools[key];
    document.getElementById('active-tool').innerHTML = `
        <h2>${tool.title}</h2>
        ${tool.html}
        ${outputHeader}
    `;
}

async function runTool(action) {
    const input = document.getElementById('input')?.value;
    const out = document.getElementById('output');
    
    try {
        switch(action) {
            case 'json-format':
                out.textContent = JSON.stringify(JSON.parse(input), null, 4);
                break;
            case 'json-minify':
                out.textContent = JSON.stringify(JSON.parse(input));
                break;
            case 'b64-encode':
                out.textContent = btoa(input);
                break;
            case 'b64-decode':
                out.textContent = atob(input);
                break;
            case 'hash-256':
                const msgBuffer = new TextEncoder().encode(input);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                out.textContent = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
                break;
            case 'gen-uuid':
                out.textContent = crypto.randomUUID();
                break;
        }
    } catch (e) {
        out.textContent = "Error: " + e.message;
    }
}

init();
