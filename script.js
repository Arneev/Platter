/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* #region  Classes */
class ApiClient {
    constructor() {
        this.apiKey = "169b43223c27423ab673daa3138ac181";
    }

    makeURL(
        query,
        cusineList,
        dietList,
        alergList,
        maxCarb,
        minCarb,
        maxCalories,
        minCalories,
        maxProtein,
        minProtein,
        maxFat,
        minFat,
        maxSugar,
        minSugar,
        maxSodium,
        minSodium,
        maxFiber,
        minFiber,
        maxReadyTime
    ) {
        var url =
            "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
            this.apiKey +
            "&number=50" +
            "&query=" +
            query +
            "&addRecipeInformation=true" +
            "&instructionsRequired=true";

        if (cusineList.length != 0) {
            url += "&cuisine=" + prepListForHttp(cusineList);
        }

        if (dietList.length != 0) {
            url += "&diet=" + prepListForHttp(dietList);
        }

        if (alergList.length != 0) {
            url += "&intolerances=" + prepListForHttp(alergList);
        }

        //Carb
        if (maxCarb != null) {
            url += "&maxCarbs=" + maxCarb;
        }

        if (minCarb != null) {
            url += "&minCarbs=" + minCarb;
        }

        //Calories
        if (maxCalories != null) {
            url += "&maxCalories=" + maxCalories;
        }

        if (minCalories != null) {
            url += "&minCalories=" + minCalories;
        }

        //Protein
        if (maxProtein != null) {
            url += "&maxProtein=" + maxProtein;
        }

        if (minProtein != null) {
            url += "&minProtein=" + minProtein;
        }

        //Fat
        if (maxFat != null) {
            url += "&maxFat=" + maxFat;
        }

        if (minFat != null) {
            url += "&minFat=" + minFat;
        }

        //Fiber
        if (maxFiber != null) {
            url += "&maxFiber=" + maxFiber;
        }

        if (minFiber != null) {
            url += "&minFiber=" + minFiber;
        }

        //Sodium
        if (maxSodium != null) {
            url += "&maxSodium=" + maxSodium;
        }

        if (minSodium != null) {
            url += "&minSodium=" + minSodium;
        }

        //Sugar
        if (maxSugar != null) {
            url += "&maxSugar=" + maxSugar;
        }

        if (minSugar != null) {
            url += "&minSugar=" + minSugar;
        }

        //Max Ready Time
        if (maxReadyTime != null) {
            url += "&maxReadyTime=" + maxReadyTime;
        }

        // alert(url);
        return url;
    }
}

class FoodInfo {
    constructor() {
        this.score = 0;
        this.title = "";
        this.healthScore = 0;
        this.maxReadyHours = 0;
        this.maxReadyMins = 0;
        this.servings = 0;
        this.image = "";
        this.sumamry = "";
        this.dietList = [];
        this.equipmentList = [];
        this.ingredientList = [];
        this.calories = 0;
        this.caloriesUnit = "";
        this.fat = 0;
        this.fatUnit = "";
        this.fiber = 0;
        this.fiberUnit = "";
        this.sodium = 0;
        this.sodiumUnit = "";
        this.sugar = 0;
        this.sugarUnit = "";
        this.protein = 0;
        this.proteinUnit = "";
        this.carbs = 0;
        this.carbsUnit = "";
        this.steps = [];
        this.id = 0;
    }
}

/* #endregion */

var apiClient = new ApiClient();
var listOfFoodTiles = [];
var pureJSON;
var totalAmountResults = 0;

/* #region  Get and Sort Results */

var query = "";

var maxCarb = null;
var minCarb = null;

var maxCalories = null;
var minCalories = null;

var maxProtein = null;
var minProtein = null;

var maxFat = null;
var minFat = null;

var maxSugar = null;
var minSugar = null;

var maxSodium = null;
var minSodium = null;

var maxFiber = null;
var minFiber = null;

var maxReadyTime = null;

var totAmount = 0;
function getResults() {
    // pureJSON = {};
    // setResults();
    // return;
    pureJSON = "";
    query = document.getElementById("searchBox").value.trim();

    //Check if null
    if (query == "") {
        alert("Query is empty");
        return null;
    }

    /* #region  Get MaxMin */
    //Carb
    maxCarb = document.getElementById("maxCarbs").value;
    if (maxCarb == "") {
        maxCarb = null;
    }

    minCarb = document.getElementById("minCarbs").value;
    if (minCarb == "") {
        minCarb = 0;
    }

    //Calories
    maxCalories = document.getElementById("maxCalories").value;
    if (maxCalories == "") {
        maxCalories = null;
    }

    minCalories = document.getElementById("minCalories").value;
    if (minCalories == "") {
        minCalories = 0;
    }

    //Protein
    maxProtein = document.getElementById("maxProtein").value;
    if (maxProtein == "") {
        maxProtein = null;
    }

    minProtein = document.getElementById("minProtein").value;
    if (minProtein == "") {
        minProtein = 0;
    }

    //Fat
    maxFat = document.getElementById("maxFat").value;
    if (maxFat == "") {
        maxFat = null;
    }

    minFat = document.getElementById("minFat").value;
    if (minFat == "") {
        minFat = 0;
    }

    //Sugar
    maxSugar = document.getElementById("maxSugar").value;
    if (maxSugar == "") {
        maxSugar = null;
    }

    minSugar = document.getElementById("minSugar").value;
    if (minSugar == "") {
        minSugar = 0;
    }

    //Sodium
    maxSodium = document.getElementById("maxSodium").value;
    if (maxSodium == "") {
        maxSodium = null;
    }

    minSodium = document.getElementById("minSodium").value;
    if (minSodium == "") {
        minSodium = 0;
    }

    //Fiber
    maxFiber = document.getElementById("maxFiber").value;
    if (maxFiber == "") {
        maxFiber = null;
    }

    minFiber = document.getElementById("minFiber").value;
    if (minFiber == "") {
        minFiber = 0;
    }

    maxReadyTime = document.getElementById("maxReadyTime").value;
    if (maxReadyTime == "") {
        maxReadyTime = null;
    }

    /* #endregion */

    var url = apiClient.makeURL(
        query,
        cusineList,
        dietList,
        alergList,
        maxCarb,
        minCarb,
        maxCalories,
        minCalories,
        maxProtein,
        minProtein,
        maxFat,
        minFat,
        maxSugar,
        minSugar,
        maxSodium,
        minSodium,
        maxFiber,
        minFiber,
        maxReadyTime
    );
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            pureJSON = JSON.parse(xmlHttp.responseText);
            setResults();
        }
    };

    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function jsonToFoodList(jsons) {
    totAmount = jsons.totalResults;
    var list = [];

    for (let result of jsons.results) {
        let foodInfo = jsonToFoodInfo(result);
        if (foodInfo != null) {
            list.push(foodInfo);
        }
    }

    return list;
}

function jsonToFoodInfo(json) {
    try {
        var foodInfo = new FoodInfo();

        foodInfo.score = json.spoonacularScore;
        foodInfo.title = capitalizeWords(json.title);
        foodInfo.healthScore = json.healthScore;
        foodInfo.id = json.id;

        foodInfo.maxReadyHours = Math.floor(json.readyInMinutes / 60);
        foodInfo.maxReadyMins =
            json.readyInMinutes - foodInfo.maxReadyHours * 60;
        foodInfo.servings = json.servings;
        foodInfo.image = json.image;
        foodInfo.sumamry = json.summary;
        foodInfo.dietList = json.diets;

        var nutrients = json.nutrition.nutrients;

        for (let nutrientBlock of nutrients) {
            if (nutrientBlock.title == "Calories") {
                foodInfo.calories = nutrientBlock.amount.toFixed(2);
                foodInfo.caloriesUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Protein") {
                foodInfo.protein = nutrientBlock.amount.toFixed(2);
                foodInfo.proteinUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Fat") {
                foodInfo.fat = nutrientBlock.amount.toFixed(2);
                foodInfo.fatUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Carbohydrates") {
                foodInfo.carbs = nutrientBlock.amount.toFixed(2);
                foodInfo.carbsUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Fiber") {
                foodInfo.fiber = nutrientBlock.amount.toFixed(2);
                foodInfo.fiberUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Sodium") {
                foodInfo.sodium = nutrientBlock.amount.toFixed(1);
                foodInfo.sodiumUnit = nutrientBlock.unit;
            }

            if (nutrientBlock.title == "Sugar") {
                foodInfo.sugar = nutrientBlock.amount.toFixed(2);
                foodInfo.sugarUnit = nutrientBlock.unit;
            }
        }

        var instructionList = json.analyzedInstructions[0].steps;

        for (let instruction of instructionList) {
            foodInfo.steps.push(instruction.step);

            for (let ingredient of instruction.ingredients) {
                try {
                    let name = capitalizeWords(ingredient.name);

                    if (!foodInfo.ingredientList.includes(name)) {
                        foodInfo.ingredientList.push(name);
                    }
                } catch (error) {}
            }

            for (let equipment of instruction.equipment) {
                try {
                    let name = capitalizeWords(equipment.name);

                    if (!foodInfo.equipmentList.includes(name)) {
                        foodInfo.equipmentList.push(name);
                    }
                } catch (error) {}
            }
        }

        return foodInfo;
    } catch (error) {
        return null;
    }
}

function setResults() {
    clearFoodList();
    if (pureJSON.results.length == 0) {
        alert("No results");
        return;
    }

    listOfFoodTiles = jsonToFoodList(pureJSON);

    let length = listOfFoodTiles.length;
    for (var i = 0; i < length; i++) {
        addFoodTile(listOfFoodTiles[i]);
    }
}

/* #endregion */

/* #region  DropDowns */
const noSelect = "none";

//Cousines
var cusineList = [];
function addCusine() {
    var cusineDropDown = document.getElementById("cusineDropDown");
    var cusineVal = cusineDropDown.value;

    if (cusineVal == noSelect) {
        cusineList = [];
    } else {
        if (!cusineList.includes(cusineVal)) {
            cusineList.push(cusineVal);
        }
    }

    updateCusine();
}

function updateCusine() {
    document.getElementById("cusineContent").innerHTML = prepList(cusineList);
}

//Diet
var dietList = [];
function addDiet() {
    var dietDropDown = document.getElementById("dietDropDown");
    var dietVal = dietDropDown.value;

    if (dietVal == noSelect) {
        dietList = [];
    } else {
        if (!dietList.includes(dietVal)) {
            dietList.push(dietVal);
        }
    }

    updateDiet();
}

function updateDiet() {
    document.getElementById("dietContent").innerHTML = prepList(dietList);
}

//Alergies
var alergList = [];
function addAlerg() {
    var alergDropDown = document.getElementById("alergiesDropDown");
    var alergVal = alergDropDown.value;

    if (alergVal == noSelect) {
        alergList = [];
    } else {
        if (!alergList.includes(alergVal)) {
            alergList.push(alergVal);
        }
    }

    updateAlerg();
}

function updateAlerg() {
    document.getElementById("alergContent").innerHTML = prepList(alergList);
}

function prepList(list) {
    var newList = [];
    let length = list.length;

    if (length != 0) {
        newList.push(list[0]);
    }

    for (let i = 1; i < length; i++) {
        newList.push(" " + list[i]);
    }

    return newList.toString();
}

function prepListForHttp(list) {
    var newList = [];
    let length = list.length;

    for (let i = 0; i < length; i++) {
        newList.push(list[i].trim());
    }

    return newList.toString();
}

/* #endregion */

function addFoodTile(foodInfo) {
    var foodList = document.getElementById("foodList");

    /* #region  GetListHTML */
    var dietListString = foodListToHtmlUL(foodInfo.dietList, "Diet");

    var equipmentListString = foodListToHtmlUL(
        foodInfo.equipmentList,
        "Equipment"
    );

    var ingredientsListString = foodListToHtmlUL(
        foodInfo.ingredientList,
        "Ingridents"
    );

    var stepsListString = stepsListToHtml(foodInfo.steps);
    /* #endregion */

    var innerHtmlText = `<div id="${foodInfo.id}">
    <div id="foodTile">
        <div id="foodHeading">
            <p>${foodInfo.title}</p>
        </div>

        <div id="quickInfo">
            <div class="quickInfoBlock">
                <h5>Score</h5>
                <p>${foodInfo.score}</p>
            </div>

            <div class="quickInfoBlock">
                <h5>Servings</h5>
                <p>${foodInfo.servings}</p>
            </div>

            <div class="quickInfoBlock">
                <h5>Ready Time</h5>
                <div class="readyTimeHori">
                    <p>${foodInfo.maxReadyHours}</p>
                    <p class="timeUnit">hours</p>
                </div>

                <div class="readyTimeHori">
                    <p>${foodInfo.maxReadyMins}</p>
                    <p class="timeUnit">mins</p>
                </div>
            </div>

            <div class="quickInfoBlock">
                <h5>Health Score</h5>
                <p>${foodInfo.healthScore}</p>
            </div>
        </div>

        <div id="foodSummary">
            <div id="foodImage">
                <img
                    src="${foodInfo.image}"
                    alt="${foodInfo.title + " Image"}"
                />
            </div>
            <p>
                ${foodInfo.sumamry}
            </p>
        </div>

        <div id="foodLists">
            ${dietListString}

            ${equipmentListString}

            ${ingredientsListString}
        </div>

        <div id="healthOverview">
            <div class="healthBlock">
                <h4>Calories</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.calories}</p>
                    <p class="pUnit">${foodInfo.caloriesUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Fat</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.fat}</p>
                    <p class="pUnit">${foodInfo.fatUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Fiber</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.fiber}</p>
                    <p class="pUnit">${foodInfo.fiberUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Sodium</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.sodium}1</p>
                    <p class="pUnit">${foodInfo.sodiumUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Sugar</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.sugar}</p>
                    <p class="pUnit">${foodInfo.sugarUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Protein</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.protein}</p>
                    <p class="pUnit">${foodInfo.proteinUnit}</p>
                </div>
            </div>

            <div class="healthBlock">
                <h4>Carbs</h4>
                <div class="healthInfoUnit">
                    <p>${foodInfo.carbs}</p>
                    <p class="pUnit">${foodInfo.carbsUnit}</p>
                </div>
            </div>
        </div>

        <div id="foodSteps">
            <h2>Steps</h2>
            ${stepsListString}
        </div>
    </div>
</div>`;

    foodList.innerHTML += innerHtmlText;
    addToIndex(foodInfo.id, foodInfo.title);
}

function addToIndex(id, title) {
    var foodIndexElement = document.getElementById("foodIndexUL");

    foodIndexElement.innerHTML += `<a href="#${id}"><li onclick="this.style.cssText = 'color: yellow;';">${title}</li></a>`;
}

function foodListToHtmlUL(list, heading) {
    var html = '<div class="foodList">';
    html += `<h4>${heading}</h4>`;

    html += "<ul>";

    list.forEach((element) => {
        html += `<li>${element}</li>`;
    });

    html += "<ul>";
    html += "</div>";

    return html;
}

function stepsListToHtml(list) {
    let length = list.length;
    var html = "";
    for (var i = 0; i < length; i++) {
        html += `<div class="stepBlocks">`;
        html += `<h3>${i + 1}</h3>`;
        html += `<p>${list[i]}</p>`;
        html += `</div>`;
    }

    return html;
}

function clearFoodList() {
    var foodList = document.getElementById("foodList");
    foodList.innerHTML = "";
    var foodIndex = document.getElementById("foodIndexUL");
    foodIndex.innerHTML = "";
}

function capitalizeWords(string) {
    var list = string.split(" ");
    var temp = "";

    var length = list.length;
    for (var i = 0; i < length; i++) {
        let word = list[i];
        temp += word.charAt(0).toUpperCase() + word.slice(1);

        if (i != length - 1) {
            temp += " ";
        }
    }

    return temp;
}

// function testOut() {
//     alert("testing out");
//     // alert(JSON.stringify(pureJSON));
//     // var a = document.createElement("a");
//     // var file = new Blob([JSON.stringify(pureJSON)], { type: String });
//     // a.href = URL.createObjectURL(file);
//     // a.download = "jsonFile";
//     // a.click();
//     setResults();
// }
