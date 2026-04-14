import '../sass/main.scss';
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const url = "https://lab2-backend-xzxp.onrender.com/workexperience";

//renderExperience();
//createExperience();
//deleteExperience(27);
//updateExperience(23);
async function fetchData() {

    const response = await fetch(url)
    const experiences = await response.json();

    console.log(experiences);
    renderExperience(experiences);
}

async function createExperience(companyName, jobTitle, location, description) {
    let experience = {
        companyName: companyName,
        jobTitle: jobTitle,
        location: location,
        description: description
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(experience)
    });

    const data = await response.json();
    console.log(data);
}

async function deleteExperience(id) {
    const response = await fetch(url + "/" + id, {
        method: "DELETE"
    });
    const data = await response.json();

    console.log(data);
}

async function updateExperience(id) {
    const response = await fetch(url + "/" + id, {
        method: "PUT"
    });
    const data = await response.json();
    console.log(data);
}

export function renderExperience(experiences) {
    //const experiencesDiv = document.getElementById("experiences-container");
    const experienceList = document.getElementById("experience-list");
    // Om användaren inte befinner sig på startsidan
    if (!experienceList) {
        return;
    }
    experienceList.innerHTML = "";

    experiences.forEach(exp => {
        experienceList.innerHTML += `
        <article class="experience-item">
            <h3>${exp.companyName} - ${exp.location}</h3>
            <h4>${exp.jobTitle}</h4>
            <p> <span class="span-description">Arbetsbeskrivning:</span> ${exp.description}
            <div id="experience-btns">
            <button class="delete-btn">Radera</button>
            <button class="update-btn">Uppdatera</button>
            </div>
        </article>
        `
    });
}