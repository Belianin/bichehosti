
const apiUrl = 'https://script.google.com/macros/s/AKfycbxGgs8UwpqKMoqHiHqkuYCeC1QbfpwpPJSzRtcfR8IJxJYNv401Ntsj7F4dT-BPF4Svow/exec';

let lists = [];
let currentList = "";

async function main() {
    await getLists();
    await getList();
    document.getElementById("listSelect").disabled = false;
    document.getElementById("new-question-button").disabled = false;
}

main();

async function getLists() {
    lists = await fetch(`${apiUrl}?method=getLists`)
        .then(x => {
            if (x.ok)
                return x.json();

            console.error(x);

            return {};
        })
        .then(x => {
            if (x.isSuccess) {
                return x.data;
            }

            console.error(x.errorMessage);
            return []
        });

    console.log(lists);

    currentList = lists[0];
    const listSelect = document.getElementById('listSelect');

    for (let list of lists) {
        let option = document.createElement('option');
        option.value = list;
        option.innerText = list;
        listSelect.appendChild(option);
    }

    document.getElementById('listSelect').value = currentList;
}

async function getList() {

    document.getElementById("listSelect").disabled = true;
    document.getElementById("new-question-button").disabled = true;

    let response = await fetch(`${apiUrl}?method=getList&listName=${currentList}`)
        .then(x => {
            if (x.ok)
                return x.json();

            console.error(x);

            return {};
        })
        .then(x => {
            if (x.isSuccess) {
                return x.data;
            }

            console.log(x.errorMessage);
            return {
                easyQuestions: [],
                hardQuestions: []
            }
        });

    console.log(`Got list ${currentList}: ${response.easyQuestions.length}:${response.hardQuestions.length}`);

    easyQuestions = response.easyQuestions;
    hardQuestions = response.hardQuestions;
    played = new Set();

    document.getElementById("listSelect").disabled = false;
    document.getElementById("new-question-button").disabled = false;
}

let hardChange = 0;
let played = new Set();

function selectQuestion(){
    let roll = Math.floor(Math.random() * 100);
    let q = [];

    let h = hardQuestions.filter(q => !played.has(q));
    let e = easyQuestions.filter(q => !played.has(q));

    let chancesLabel = document.getElementById('chancesLable');
    if (roll < hardChange && h.length > 0) {
        q = h
        hardChange = 0;
        chancesLabel.innerHTML = "Сложный вопрос!"
    } else if (e.length > 0) {
        q = e;
        hardChange += 33;
        chancesLabel.innerHTML = `Шанс на сложный вопрос ${hardChange}%`
    } else if (h.length > 0) {
        q = h
        hardChange = 0;
        chancesLabel.innerHTML = "Сложный вопрос!"
    } else {
        return "Вопросы кончились!"
    }

    return q[Math.floor(Math.random() * q.length)];
}

function getQuestion(){
    let selectedQuestion = selectQuestion();

    played.add(selectedQuestion);

    document.getElementById('playedLabel').innerHTML = `Использовано ${played.size}/${easyQuestions.length + hardQuestions.length} вопросов`;

    document.getElementById('question').innerHTML = selectedQuestion;
}


document.getElementById("new-question-button").addEventListener("click", getQuestion);

document.getElementById("listSelect").addEventListener("change", async v => {
    currentList = v.target.value;
    await getList();
});