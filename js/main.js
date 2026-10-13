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
        errorMessage.textContent = "Vänligen ange en sökterm.";
        return false;
    } else {
        errorMessage.textContent = "";
        return true;
    }
}

// Eventlyssnare för formuläret
searchForm.addEventListener("submit", (event) => {
    // När formuläret skickas:
    event.preventDefault();
    // - validera inmatningen
    if (validateForm()) {
        // - om valideringen lyckas
        console.log("Formuläret är giltigt.");
    };
});
