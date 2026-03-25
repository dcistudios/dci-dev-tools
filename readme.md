# 🛠️ DCI Dev Tools

> Part of the [DCI Studios](https://github.com/DCI-Studios) Public Release Initiative.

**DCI Dev Tools** is a high-performance, web-based utility suite designed for developers who need fast, client-side tools without the overhead. Built on the DCI "private-first" philosophy—now optimized for the public.

## 🚀 Features
* **JSON Suite:** High-speed formatting and minification.
* **Security:** SHA-256 Hashing via Web Crypto API.
* **Encoding:** Base64 conversion for headers and data.
* **Generators:** Cryptographically strong UUID v4 generation.

## 🛠️ Tech Stack
* **Frontend:** Vanilla JS, CSS3, HTML5
* **Backend:** Node.js, Express (v4.x)
* **Runtime:** Docker / NVMe-optimized images

## 📦 Deployment
This project is Docker-ready and optimized for **Coolify** or standard VPS environments.

```bash
docker build -t dci-dev-tools .
docker run -p 3000:3000 dci-dev-tools
© 2026 DCI Studios — Architecting Excellence.
---
MIT License

Copyright (c) 2026 DCI Studios

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
