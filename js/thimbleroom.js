import loadFile from './base.js'

function tryToReplaceSmile(smileName) {
    return `<img class="smile" src="./data/smiles/${smileName.substring(1, smileName.length - 1)}.png" alt="${smileName}"/>`;
}

function convertToHtml(section) {
    const result = [];

    if (section.background)
        result.push(`<img src="./data/images/${section.background}" alt="${section.background}" class="background-image"/>`);
    result.push(`<h2 class="goldenrod">${section.title}</h2>`);

    for (let thimble of section.thimbles) {
        result.push(
    `<section class="term-section centered">
        ${thimble.text.replace(/:\w+:/g, tryToReplaceSmile)}
        <div class="history">
            <i>${thimble.description}</i>
        </div>
    </section>`);
    }

    return result.join("")
}

function onLoad() {
    const data = JSON.parse(loadFile("./data/thimbles.json"));

    const result = [];
    for (let section of data) {
        result.push(convertToHtml(section))
    }

    document.getElementById("content").innerHTML = result.join("")
}

window.onload = onLoad;
