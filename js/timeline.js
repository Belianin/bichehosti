import loadFile from "./base.js";

function convertToHtml(year) {
    const result = [];
    result.push(`<h2 class="red">${year.year}</h2>`);
    for (let month of year.months) {
        const days = [];
        for (let i = 0; i < 31; i++) {
            days.push(`<span class="gray">&nbsp;|<br></span>`)
        }

        for (let e of month.events) {
            const className = e.type ? `class="${e.type}"` : ""
            days[e.day - 1] = `<p ${className}>|${e.day}| ${e.event}</p>`
        }

        if (month.events.length > 0)
            result.push(`<h3 class="goldenrod">${month.month}</h3>`);
        else
            result.push(`<h3 class="gray">${month.month}</h3>`);


        for (let day of days) {
            result.push(day)
        }
    }

    return result.join("");
}

function onLoad() {
    const result = [];
    const years = JSON.parse(loadFile("./data/timeline.json"));
    for (const year of years) {
        result.push(convertToHtml(year))
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");
}

window.onload = onLoad;
