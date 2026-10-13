"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: MARIA WESTIN
 */

// Hämta elementen från DOM
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
    

// Funktion för att validera formuläret
function validateForm() {
    if (searchInput.value.trim() === "") { // Tar bort blanksteg och kontrollerar om namn är tomt
        errorMessage.textContent = "Vänligen ange ett sökord.";
        return false;
    } else {
        errorMessage.textContent = "";
        return true;
    }
}

// Funktion för att hämta data från API:et
async function fetchData() {
    try {
        const searchTerm = searchInput.value.trim();
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`);
        if (!response.ok) {
            throw new Error("Något gick fel med API-anropet.");
        }
        const data = await response.json();
        console.log("Data från API:", data);
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
}

// Eventlyssnare för formuläret
searchForm.addEventListener("submit", (event) => {
    // När formuläret skickas:
    event.preventDefault();
    // - validera inmatnignen
    if (validateForm()) {
        // - om valideringen lyckas
        console.log("Formuläret är giltigt.");
        fetchData();
    };
});
