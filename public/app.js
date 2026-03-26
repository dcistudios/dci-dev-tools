/**
 * DCI Dev Tools - Core Logic
 * Private-first, client-side utility suite.
 */

const tools = {
    'json-format': {
        title: 'JSON Suite',
        html: `<textarea id="input" placeholder="Paste messy JSON here..."></textarea>
               <div class="actions">
                   <button onclick="runTool('json-format')">Beautify</button>
                   <button onclick="runTool('json-minify')">Minify</button>
               </div>`
    },
    'jwt-inspect': {
        title: 'JWT Debugger',
        html: `<textarea id="input" placeholder="Paste JWT (header.payload.signature)"></textarea>
               <div class="actions">
                   <button onclick="runTool('jwt-decode')">Decode Payload</button>
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
    'url-suite': {
        title: 'URL Tools',
        html: `<input type="text" id="input" placeholder="https://example.com?query=test">
               <div class="actions">
                   <button onclick="runTool('url-parse')">Parse Params</button>
                   <button onclick="runTool('url-encode')">URL Encode</button>
                   <button onclick="runTool('url-decode')">URL Decode</button>
               </div>`
    },
    'hash': {
        title: 'SHA-256 Hasher',
        html: `<input type="text" id="input" placeholder="Enter string...">
               <div class="actions">
                   <button onclick="runTool('hash-256')">Generate Hash</button>
               </div>`
    },
    'text-utils': {
        title: 'Text Analyzer',
        html: `<textarea id="input" placeholder="Type or paste text..."></textarea>
               <div class="actions">
                   <button onclick="runTool('text-stats')">Get Stats</button>
                   <button onclick="runTool('text-upper')">UPPERCASE</button>
                   <button onclick="runTool('text-lower')">lowercase</button>
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
const outputHeader = `
    <div class="output-container">
        <div class="output-header">
            <h3>Output</h3>
            <button class="copy-btn" onclick="copyOutput()">Copy</button>
        </div>
        <pre id="output"></pre>
    </div>`;

/**
 * Initializes the sidebar and loads the default tool
 */
function init() {
    let menuHtml = '<div class="menu">';
    for (const key in tools) {
        menuHtml += `<button class="menu-btn" onclick="loadTool('${key}')">${tools[key].title}</button>`;
    }
    menuHtml += '</div><div id="active-tool"></div>';
    container.innerHTML = menuHtml;
    loadTool('json-format');
}

/**
 * Renders the selected tool interface
 */
function loadTool(key) {
    const tool = tools[key];
    const activeArea = document.getElementById('active-tool');
    activeArea.innerHTML = `
        <h2>${tool.title}</h2>
        ${tool.html}
        ${outputHeader}
    `;
    
    // UI Polish: Update active state on buttons
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === tool.title);
    });
}

/**
 * Core execution logic for all tools
 */
async function runTool(action) {
    const input = document.getElementById('input')?.value || '';
    const out = document.getElementById('output');
    
    try {
        switch(action) {
            case 'json-format':
                out.textContent = JSON.stringify(JSON.parse(input), null, 4);
                break;
            case 'json-minify':
                out.textContent = JSON.stringify(JSON.parse(input));
                break;
            case 'jwt-decode':
                const payload = input.split('.')[1];
                out.textContent = JSON.stringify(JSON.parse(atob(payload)), null, 4);
                break;
            case 'b64-encode':
                out.textContent = btoa(input);
                break;
            case 'b64-decode':
                out.textContent = atob(input);
                break;
            case 'url-parse':
                const url = new URL(input);
                out.textContent = JSON.stringify({
                    protocol: url.protocol,
                    host: url.host,
                    pathname: url.pathname,
                    params: Object.fromEntries(url.searchParams)
                }, null, 4);
                break;
            case 'url-encode':
                out.textContent = encodeURIComponent(input);
                break;
            case 'url-decode':
                out.textContent = decodeURIComponent(input);
                break;
            case 'hash-256':
                const msgBuffer = new TextEncoder().encode(input);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                out.textContent = Array.from(new Uint8Array(hashBuffer))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
                break;
            case 'text-stats':
                const words = input.trim() ? input.trim().split(/\s+/).length : 0;
                out.textContent = `Characters: ${input.length}\nWords: ${words}\nLines: ${input.split('\n').length}`;
                break;
            case 'text-upper':
                out.textContent = input.toUpperCase();
                break;
            case 'text-lower':
                out.textContent = input.toLowerCase();
                break;
            case 'gen-uuid':
                out.textContent = crypto.randomUUID();
                break;
        }
    } catch (e) {
        out.textContent = "Error: " + e.message;
    }
}

/**
 * Utility to copy output to clipboard
 */
function copyOutput() {
    const text = document.getElementById('output').textContent;
    if (text) {
        navigator.clipboard.writeText(text);
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = originalText, 2000);
    }
}

// Start the app
init();
