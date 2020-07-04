function loadFile(filePath) {
    let result = null;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();

    if (xmlHttp.status === 200) {
        result = xmlHttp.responseText;
    }

    return result;
}

export default loadFile
