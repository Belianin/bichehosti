import loadFile from './base.js'

function changeTheme() {
    const link = document.getElementById("css-link")
    if (link.href.includes("css/darkhost.css"))
        link.href = "css/whitehost.css"
    else
        link.href = "css/darkhost.css"
}


function convertToHtml(term) {
    return `
    <section class="term-section centered">
        <a name=\"${term.anchor}\"></a>
        <div>
            <b>${term.title}</b> — ${term.definition}
        </div>
        <div class="history">
            <i>${term.history}</i>
        </div>
    </section>`
}

function onLoad() {
    const data = JSON.parse(loadFile("./data/glossary.json"));
    const result = [];

    for (const term of data.terms) {
        result.push(convertToHtml(term));
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");

    const result2 = [];
    for (const moment of data.moments) {
        result2.push(convertToHtml(moment))
    }

    const content2 = document.getElementById("content2");
    content2.innerHTML = result2.join("");

    document.getElementById("theme-button").onclick = changeTheme;
}

window.onload = onLoad;
