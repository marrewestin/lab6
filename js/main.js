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
        errorMessage.textContent = "Du måste fylla i en sökfras!"; // Skriver ut felmeddelande om fältet är tomt
        return false;
    } else {
        return true;
    }
}

// Funktion för att hämta data från API:et
async function fetchRecipe() {
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
        messageContainer.textContent = "Inget recept hittades, prova en ny sökfras ...";
    } else {
        displayRecipe(data); // Anropar funktionen för att visa resultaten
        console.log("Recept hittades:", data.recipes); // Loggar de hittade recepten
    }
}

function displayRecipe(data) {
    const recipe = data.recipes[0]; // Sparar det första receptet i en variabel
    recipeContainer.innerHTML = `<article>
        <h3>${recipe.name}</h3>
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="recipe-info">
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Prep time:</strong> ${recipe.prepTimeMinutes} minutes</p>
            <p><strong>Cooking time:</strong> ${recipe.cookTimeMinutes} minutes</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        </div>
        <h4>Ingredients</h4>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
        <h4>Instructions</h4>
        <ol>
            ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
        </ol>
</article> `;
};

// Eventlyssnare för formuläret
searchForm.addEventListener("submit", (event) => {
    // När formuläret skickas:
    event.preventDefault();
    // - rensa eventuella tidigare recept
    recipeContainer.innerHTML = "";
    // - rensa eventuella tidigare meddelanden
    errorMessage.textContent = "";
    messageContainer.textContent = "";
    // - validera inmatnignen
    if (validateForm()) {
        // - om valideringen lyckas
        console.log("Formuläret är giltigt.");
        fetchRecipe();
    };
});
