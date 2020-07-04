import loadFile from "./base.js";

function countRating(smile) {
    let sum = 0.0;
    for (const r of smile.ratings) {
        sum += r.mark;
    }

    return sum / smile.ratings.length;
}

function convertRatingToHtml(rating) {
    const result = [];
    rating += 1 // лень
    while (rating >= 0) {
        const size = rating - 1 >= 1 ? 1 : rating - 1;
        result.push(`<div style="width: ${50 * size}px; height: 16px; background-color: gold; border: 1px solid black; display: inline-block"></div>`)
        rating -= 1;
    }

    return result.join("")
}

function convertToHtml(smile) {
    return `
    <section class="term-section centered">
        <div>
            <img src="./data/smiles/${smile.title}.png" style="height: 2em; width: auto"></ig><b> ${smile.title}</b> — ${smile.description}
        </div>
            ${convertRatingToHtml(countRating(smile))}<span style="color: gold"> ${countRating(smile)}</span>
        <div class="history">
            <i>${smile.history}</i>
        </div>
    </section>`
}

function onLoad() {
    const result = [];
    const smiles = JSON.parse(loadFile("./data/smiles.json"));
    smiles.sort((a, b) => countRating(b) - countRating(a));
    for (const smile of smiles) {
        result.push(convertToHtml(smile))
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");
}

window.onload = onLoad;
