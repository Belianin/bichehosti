import loadFile from "./base.js";

function convertQuestion(question) {
        return `
<div>
    <span class="goldenrod">${question.score}</span>
    ${question.question} — <span class="history">${question.answer}</span>
    ${question.solved ? "<span style=\"color: green\"\>✔</span>" : "<span style=\"color: red\"\>❌</span>"}
</div>`
}

function convertTheme(theme) {
    return `
<h3><span class="goldenrod">${theme.title.toUpperCase()}</span><span class="history"> — ${theme.description}</span></h3>
${theme.questions.map(q => convertQuestion(q)).join("")}`
}

function convertToHtml(sigame) {
    const result = [];

    for (let i = 0; i < sigame.rounds.length; i++) {
        result.push(`<h2 class="red">${i+ 1} РАУНД</h2>`);
        result.push(sigame.rounds[i].themes.map(t => convertTheme(t)).join(""))
    }

    return result.join("");
}

function onLoad() {
    const sigame = JSON.parse(loadFile("./data/sigame.json"));

    const result = convertToHtml(sigame);

    const content = document.getElementById("content");
    content.innerHTML = result
}

window.onload = onLoad;
