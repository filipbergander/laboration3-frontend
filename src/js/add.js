"use strict";
// Hämtar in funktioner från main.js
import { renderExperience } from "./main.js";
import { createExperience } from "./main.js";
import { updateExperience } from "./main.js";

// Formulär och felmeddelande-lista
const errorMsgList = document.getElementById("error-message");
const addExpForm = document.getElementById("add-experience-form");

// Knapp för att lägga till/uppdatera erfarenhet
const addWorkBtn = document.getElementById("add-work-btn");
const svgIcon = document.getElementById("svg-icon");
// Inputs
const companyInput = document.getElementById("company");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

// När DOM har laddats in
document.addEventListener("DOMContentLoaded", async() => {
    const updateWorkID = localStorage.getItem("updateWorkID"); // Hämtar in key

    // Om inget finns finns lagrat i localstorage med den key så nollställs input-fält
    if (!updateWorkID) {
        companyInput.value = "";
        titleInput.value = "";
        locationInput.value = "";
        descriptionInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
    }

    // Om det finns något lagrat i localstorage med just den nyckeln
    if (updateWorkID) {
        const response = await fetch(`https://lab2-backend-xzxp.onrender.com/workexperience/${updateWorkID}`); // Använder key inom anropet
        const data = await response.json(); // Array av objekt som hämtas via anropet

        // Sätter värden för inputs utefter värdena inom databasen för det specifika id
        companyInput.value = data.company_name;
        titleInput.value = data.job_title;
        locationInput.value = data.location;
        descriptionInput.value = data.description;
        startDateInput.value = data.start_date.slice(0, 10); // Gör datumet till yyyy-mm-dd format
        endDateInput.value = data.end_date.slice(0, 10); // Gör datumet till yyyy-mm-dd format

        addWorkBtn.childNodes[0].textContent = "Uppdatera erfarenhet"; // Ändrar bara knappens innehåll
        svgIcon.textContent = "work_update"; // Ändrar till en annan ikon
    }
});
// Formulär med händelselyssnare på submit
addExpForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    let errors = []; // Tom array för felmeddelanden till en början

    // Värdena inom inputs
    const company = companyInput.value.trim();
    const title = titleInput.value.trim();
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    // Felhantering som ger olika felmeddelanden beroende på vad användaren inte skrivit i inputs
    if (company === "") {
        errors.push("Fyll i arbetsgivare!");
    }
    // Inte angett titel
    if (title === "") {
        errors.push("Fyll i titel för arbetet!")
    }
    // Inte angett ort
    if (location === "") {
        errors.push("Fyll i ort för arbetet!")
    }
    // Inte angett en beskrivning av jobbet
    if (description.length === 0) {
        errors.push("Skriv en beskrivning av arbetet!")
    }

    if (startDate === "") {
        errors.push("Välj ett startdatum för arbetet!")
    }
    if (endDate === "") {
        errors.push("Välj ett slutdatum för arbetet!")
    }

    if (startDate > endDate) {
        errors.push("Startdatumet kan inte vara efter slutdatumet!")
    }

    // Om det finns felmeddelanden så visas felmeddelanden ända tills inga errors finns
    if (errors.length > 0) {
        displayErrorMsg(errors);
        return;
    }

    const updateWorkID = localStorage.getItem("updateWorkID");

    // Om det finns key sparad i localstorage
    if (updateWorkID) {
        await updateExperience(updateWorkID); // Körs funktionen för att uppdatera ett befintligt arbete i CV genom key ID 
        localStorage.removeItem("updateWorkID"); // Tar bort key från localstorage
        window.location.href = "index.html";
        return;
    } else {
        await createExperience(); // Annars anropas funktionen för att skapa en ny arbetserfarenhet till CV 
        // Tömmer inputs, inte helt nödvändigt eftersom man blir redirected till index.html
        companyInput.value = "";
        titleInput.value = "";
        locationInput.value = "";
        descriptionInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
        errorMsgList.innerHTML = "";

    }
    // Redirect om allt gått bra, antingen för update eller när man lägger till ett nytt jobb
    //window.location.href = "index.html";
    showPopUp();
});
// Visar felmeddelanden 
export function displayErrorMsg(errors) {
    errorMsgList.innerHTML = ""; // Tömmer listan för att inte skapa felmeddelanden på felmeddelanden

    errors.forEach((error) => {
        const li = document.createElement("li"); // Skapar li-element
        li.textContent = error; // Ger varje li error-innehållet
        errorMsgList.appendChild(li); // Lägger till varje li inom listan
    });
}

function showPopUp() {
    const popUp = document.getElementById("pop-up");
    if (!popUp) {
        return;
    }
    popUp.classList.add("visible"); // Lägger till klassen visible som gör att pop-upen visas
    setTimeout(() => {
        popUp.classList.remove("visible");
    }, 4000);
}