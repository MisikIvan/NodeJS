const fs = require("fs");
const path = "user.json";

function add(language){
    let userJSON = fs.readFileSync(path, "utf-8");
    let user = JSON.parse(userJSON);

    user.languages.push(language);

    fs.writeFileSync(path, JSON.stringify(user));
}

function remove(title){
    let userJSON = fs.readFileSync(path, "utf-8");
    let user = JSON.parse(userJSON);

    let findLanguage = user.languages.findIndex(obj => obj.title == title)

    if(findLanguage == -1) {
        console.log("No language found")
    } else {
        user.languages.splice(findLanguage, 1)
        fs.writeFileSync(path, JSON.stringify(user))
        console.log("Languages ​​successfully deleted")
    }
}

function list(){
    let userJSON = fs.readFileSync(path, "utf-8");
    let user = JSON.parse(userJSON);

    console.log(user.languages);
}

function read(title){
    let userJSON = fs.readFileSync(path, "utf-8");
    let user = JSON.parse(userJSON);

    let findLanguage = user.languages.findIndex(obj => obj.title == title);

    if(findLanguage == -1) {
        console.log("No language found");
    } else {
        console.log(`${user.languages[findLanguage].title}: ${user.languages[findLanguage].level}`);
    }
}

module.exports = {add, remove, list, read}