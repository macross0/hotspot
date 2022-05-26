let buttonUKR, buttonENG;
let oppositeLanguage;

// Run auto language switch at page load
window.onload = startup;

function startup() {
    var userLang = navigator.language || navigator.userLanguage;
    if (userLang == "uk" || "uk-UA" || "ukr") {
        oppositeLanguage = "eng";

        buttonUKR = document.getElementById("ukr");
        buttonUKR.style.transitionTimingFunction = "steps(1, jump-start)";
        updateSwitcher(buttonUKR, true);

        setTimeout(function () {
            buttonUKR.style.transitionTimingFunction = "ease-in-out";
        }, 100)
    }
    else {
        oppositeLanguage = "ukr";
        
        buttonENG = document.getElementById("eng");
        buttonENG.style.transitionTimingFunction = "steps(1, jump-start)";
        updateSwitcher(buttonENG, true);

        setTimeout(function () {
            buttonENG.style.transitionTimingFunction = "ease-in-out";
        }, 100)
    }
}

function updateSwitcher(self, startup = false) {
    if (self.id == oppositeLanguage && !startup) {
        return;
    }
    oppositeLanguage = (oppositeLanguage == "ukr" ? "eng" : "ukr");

    let background = document.getElementById("lang-background");

    if (self.id == "ukr") {
        let buttonENG = document.getElementById("eng");

        self.style.backgroundPosition = "0 0";
        buttonENG.style.backgroundPosition = "100% 0";

        background.style.transform = "translate(0, 0)";
	    background.style.borderRadius = "3px 0 0 3px";

        self.style.cursor = "default";
        buttonENG.style.cursor = "pointer";
    }
    else{
        let buttonUKR = document.getElementById("ukr");
        
        self.style.backgroundPosition = "0 0";
        buttonUKR.style.backgroundPosition = "-100% 0";

        background.style.transform = "translate(100%, 0)";
	    background.style.borderRadius = "0 3px 3px 0";

        self.style.cursor = "default";
        buttonUKR.style.cursor = "pointer";
    }
}

// function changeLanguage(language) {
    
// }