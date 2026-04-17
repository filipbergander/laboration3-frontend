import { render } from 'sass';
import '../sass/main.scss';
"use strict";

// Inputs inom HTML
const companyInput = document.getElementById("company");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

// Div-element för att skriva ut CV till
const experienceList = document.getElementById("experience-list");

// När DOM har laddats in körs funktionen för att hämta data från backend
document.addEventListener("DOMContentLoaded", () => {
    fetchData();

    // För att slippa ha inputs ifyllda inom formuläret med data från uppdateringen när användaren navigerar sig mellan sidorna
    const linkBtns = document.querySelectorAll(".nav-links");
    linkBtns.forEach(link => {
        link.addEventListener("click", () => {
            console.log("Du klickade på länken!");
            localStorage.clear();
        });
    });
});

/**
 * För att hämta lagrad data inom databasservern (backend)
 */
async function fetchData() {
    try {
        const response = await fetch("https://lab2-backend-xzxp.onrender.com/workexperience") // Använder urlen för att anropa innehållet'
        console.log("RESPONSEN: ", response);
        if (!response.ok) {
            throw new Error(`Fel hos server ${response.status}`);
        }
        const experiences = await response.json(); // Sparar ned innehållet
        console.log("ERFARENHETER: ", experiences);
        renderExperience(experiences);
    } catch (error) { // Om något blivit fel
        console.error("Det gick inte att hämta data från servern: ", error);
        experienceList.textContent = "Kunde inte hämta data från servern. Prova igen senare eller lägg till ett nytt jobb i ditt CV."; // Felmeddelande
        experienceList.style.color = "red"; // Ger texten röd färg
        experienceList.style.fontSize = "1.3em"; // Gör texten större
    }
}
/**
 * För att skapa och lägga till ett nytt arbete inom CV:et
 */
export async function createExperience() {
    // Värdena inom varje input
    const company = companyInput.value.trim();
    const title = titleInput.value.trim();
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    let experience = {
        company_name: company,
        job_title: title,
        location: location,
        description: description,
        start_date: startDate,
        end_date: endDate
    };

    try {
        const response = await fetch("https://lab2-backend-xzxp.onrender.com/workexperience", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(experience)
        });
        // Om ingen respons ges
        if (!response.ok) {
            throw Error(`Kunde inte lägga till en ny arbetserfarenhet. Försök igen`);
        }
        const data = await response.json(); // Sparar ned responsen
        return data;

    } catch (error) { // Felmeddelande om det misslyckas
        console.error("Det gick inte att lägga till en ny arbetserfarenhet: ", error);
        throw error;
    }
}
/**
 * För att radera ett befintligt arbete som finns inom CV:et
 * @param {*} id - Det befintliga arbetets ID, för att kunna radera
 */
async function deleteExperience(id) {
    // Metod delete
    try {
        const response = await fetch("https://lab2-backend-xzxp.onrender.com/workexperience/" + id, {
            method: "DELETE"
        });
        // Om man inte fick en respons
        if (!response.ok) {
            throw new Error(`Det gick inte att radera den arbetserfarenheten`);
        }
        const data = await response.json();
        console.log("Raderat arbete:", data); // Om man lyckats radera ett jobb visas det i konsollen samt inom frontend såklart
    } catch (error) {
        console.error("Det gick inte att radera den specifika arbetserfarenheten:", error);
        throw error;
    }
}
/**
 * För att uppdatera ett befintligt arbete som finns inom CV:et
 * @param {*} id - Det befintliga arbetets ID, för att kunna uppdatera
 */
export async function updateExperience(id) {
    // Input-värden
    const company = companyInput.value.trim();
    const title = titleInput.value.trim();
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    // Sparar värdena som ett objekt
    const updWorkExp = {
        company_name: company,
        job_title: title,
        location: location,
        description: description,
        start_date: startDate,
        end_date: endDate
    };
    // Försöker med att hämta det specifika arbetet ur CV inom databasservern
    try {
        const response = await fetch("https://lab2-backend-xzxp.onrender.com/workexperience/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updWorkExp)
        });
        // Om man inte fick en respons
        if (!response.ok) {
            throw new Error(`Det gick inte att uppdatera den arbetserfarenheten`);
        }
        const data = await response.json();
    } catch (error) {
        console.error("Det gick inte att uppdatera den specifika arbetserfarenheten:", error);
        throw error;
    }
}

/**
 * För att skriva ut varje objekt av arbetserfarenhet inom CV-listan
 * @param {*} experiences - Array av objekt
 * @returns - Void (returnerar inget)
 */
export function renderExperience(experiences) {
    // Om användaren inte befinner sig på startsidan
    if (!experienceList) {
        return;
    }
    // Tömmer listan innan en ny skapas
    experienceList.innerHTML = "";

    // Struktur inom DOM
    experiences.forEach(exp => {
        experienceList.innerHTML += `
        <article class="experience-item">
            <h3>${exp.company_name} - ${exp.location}</h3>
            <h4>${exp.job_title}</h4>
            <p> <span class="span-description"><strong>Arbetsbeskrivning:</strong></span> ${exp.description}</p>
            <div class="experience-dates">
                <p><span><strong>Startdatum:</strong></span> ${exp.start_date}</p>
                <p><span><strong>Slutdatum:</strong></span> ${exp.end_date}</p>
            </div>
            <div id="experience-btns">
                <button data-id="${exp.id}" class="delete-btn">Radera</button>
                <button data-id="${exp.id}" class="update-btn">Uppdatera</button>
            </div>
        </article>
        `
    });

    // Alla knappar för att uppdatera ett befintligt arbete
    const updateBtns = document.querySelectorAll(".update-btn");
    updateBtns.forEach((btn) => {
        btn.addEventListener("click", async() => {
            const updBtnId = btn.dataset.id; // Ger variabeln det specifika id som varje "jobb-inlägg" har

            // Sparar ned det specifika ID inom localstorage, som finns inom update-knappen genom dataset id
            localStorage.setItem("updateWorkID", updBtnId);
            window.location.href = "add.html"; // Navigerar till formulär-sidan
        });
    });
}

// Eventlyssnare för att radera en specifik CV-post
document.addEventListener("click", async(event) => {
    if (event.target.classList.contains("delete-btn")) {
        const btnID = event.target.dataset.id; // Hämtar in det specifika ID som knappen fått när den skapades
        await deleteExperience(btnID); // Ger btn-id som argument mot funktionen
        event.target.closest("article").remove(); // Tar bort artikeln som knappen ligger inuti
    }
});