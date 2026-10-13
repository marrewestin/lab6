"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: MARIA WESTIN
 */

// Hämta elementen från DOM
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const messageContainer = document.querySelector("#message");
const recipeContainer = document.querySelector("#recipe");


// Funktion för att validera formuläret
function validateForm() {
    if (searchInput.value.trim() === "") { // Tar bort blanksteg och kontrollerar om fältet är tomt
        errorMessage.textContent = "Vänligen ange ett sökord."; // Skriver ut felmeddelande om fältet är tomt
        return false;
    } else {
        errorMessage.textContent = ""; // Rensar felmeddelandet om fältet inte är tomt
        return true;
    }
}

// Funktion för att hämta data från API:et
async function fetchRecipes() {
    try {
        const searchTerm = searchInput.value.trim(); // Tar bort blanksteg och sparar sökordet
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`); // Anropar API:et med sökordet
        if (!response.ok) {
            throw new Error("Något gick fel med API-anropet."); // Kastar ett fel om API-anropet misslyckas
        }
        const data = await response.json(); // Konverterar svaret till JSON
        checkRecipes(data); // Anropar funktionen för att kontrollera om det finns recept att visa
    } catch (error) {
        console.error("Fel vid hämtning av data:", error); // Loggar eventuella fel som uppstår vid hämtning av data

    }
}

function checkRecipes(data) {
    if (data.recipes.length === 0) { // Kontrollerar om inga recept hittades
        messageContainer.textContent = "Inga recept hittades för det angivna sökordet.";
    } else {
        displayRecipe(data); // Anropar funktionen för att visa resultaten
    }
}

function displayRecipe(data) {
    messageContainer.textContent = ""; // Rensar eventuella tidigare meddelanden
    recipeContainer.innerHTML = "Visar resultat:"; // 
    console.log("Visar resultat:", data);
};

// Eventlyssnare för formuläret
searchForm.addEventListener("submit", (event) => {
    // När formuläret skickas:
    event.preventDefault();
    // - validera inmatnignen
    if (validateForm()) {
        // - om valideringen lyckas
        console.log("Formuläret är giltigt.");
        fetchRecipes();
    };
});
