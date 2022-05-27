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
        changeLanguage(true, startup);
    }
    else {
        let buttonUKR = document.getElementById("ukr");
        
        self.style.backgroundPosition = "0 0";
        buttonUKR.style.backgroundPosition = "-100% 0";

        background.style.transform = "translate(100%, 0)";
	    background.style.borderRadius = "0 3px 3px 0";

        self.style.cursor = "default";
        buttonUKR.style.cursor = "pointer";
        changeLanguage(false, startup);
    }
}

function changeLanguage(isUKR, startup = false) {

    var textArray = document.querySelectorAll("#connect-hint, [type=text], [type=password], #connect-button, #guest-connect, #footer-text");
    
    if (!startup) {
        textArray.forEach(element => {
            element.style.transition = '0.2s ease-in-out';
            element.style.opacity = '0';
        }); 

        setTimeout(function() {
            replaceText(isUKR);
            textArray.forEach(element => {
                element.style.opacity = '1';
            });
        }, 200);
    }
    else {
        replaceText(isUKR);
    }

    function replaceText(isUKR) {
        if (isUKR) {
            textArray[0].textContent = "Для підключення до інтернету використовуйте свій логін та цифровий пароль";
            textArray[1].setAttribute("placeholder", "Логін");
            textArray[2].setAttribute("placeholder", "Пароль");
            textArray[3].setAttribute("value", "Під'єднатися");
            textArray[4].textContent = "Під'єднатися як гість з обмеженими можливостями";
            textArray[5].textContent = "Відділ КІТ ЛНУП";
        }
        else {
            textArray[0].textContent = "Use your login and digital password to connect to the Internet";
            textArray[1].setAttribute("placeholder", "Login");
            textArray[2].setAttribute("placeholder", "Password");
            textArray[3].setAttribute("value", "Connect");
            textArray[4].textContent = "Connect as guest with connection speed restrictions";
            textArray[5].textContent = "CIT Department of LNEU";
        }
    }
}