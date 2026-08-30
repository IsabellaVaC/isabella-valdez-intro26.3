const body = document.querySelector("body");

const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 Isabella Valdez-Curiel ${thisYear}`;

footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub", "p5.js"];
const skillsSection = document.querySelector("#Skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++){
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

let messageForm = document.forms["leave_message"];

messageForm.addEventListener ("submit", function (event) {
    event.preventDefault();

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;
    
    console.log(name, email, message);

const messageSection = document.querySelector("#messages");
const messageList = messageSection.querySelector("ul");

const newMessage = document.createElement("li");
newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span> wrote: ${message}</span>`;

const removeButton = document.createElement("button");
removeButton.innerText = "remove";
removeButton.setAttribute("type", "button");

removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
});

newMessage.appendChild(removeButton);
messageList.appendChild(newMessage);

messageForm.reset();
});