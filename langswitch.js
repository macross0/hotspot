let buttonUKR, buttonENG;
let oppositeLanguage;

// Run auto language switch at page load
window.onload = startup;

function startup() {
    console.log("gay");
    var userLang = navigator.language || navigator.userLanguage;

    buttonUKR = document.getElementById("ukr");
    buttonENG = document.getElementById("eng");
    buttonUKR.style.transitionTimingFunction = "steps(1, jump-start)";
    buttonENG.style.transitionTimingFunction = "steps(1, jump-start)";

    if (userLang == "uk" || userLang == "uk-UA" || userLang == "ukr" || userLang == "rus" || userLang == "ru-RU" || userLang == "ru") {
        oppositeLanguage = "eng";
        updateSwitcher(buttonUKR, true);
    }
    else {
        oppositeLanguage = "ukr";
        updateSwitcher(buttonENG, true);
    }

    setTimeout(function () {
        buttonUKR.style.transitionTimingFunction = "ease-in-out";
        buttonENG.style.transitionTimingFunction = "ease-in-out";
    }, 100)
}

function updateSwitcher(self, startup = false) {
    if (self.id == oppositeLanguage && !startup) {
        return;
    }
    oppositeLanguage = (oppositeLanguage == "ukr" ? "eng" : "ukr");

    let background = document.getElementById("lang-background");

    if (startup) {
        background.style.transitionTimingFunction = "steps(1, jump-start)";
    }
    else {
        background.style.transitionTimingFunction = "ease-in-out";
    }

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

    let isFirefox = navigator.userAgent.search("Firefox") > -1;

    var textArray = document.querySelectorAll("#connect-hint, #input-login, #input-password, #connect-button, #guest-connect, #footer-text");
    
    if (!startup) {
        textArray.forEach(element => {
            if (element.id != "input-login" && element.id !== "input-password") {
                element.style.transition = '0.2s ease-in-out';
                element.style.opacity = '0';
            }
            else if (!isFirefox) {
                element.classList.remove('placeholder-opacity-full');
                element.classList.add('placeholder-opacity-zero');
            }
        }); 

        setTimeout(function() {
            replaceText(isUKR);
            textArray.forEach(element => {
                if (element.id != "input-login" && element.id !== "input-password") {
                    element.style.opacity = '1';
                }
                else if (!isFirefox) {
                    element.classList.remove('placeholder-opacity-zero');
                    element.classList.add('placeholder-opacity-full');
                }
            });
        }, 200);
    }
    else {
        replaceText(isUKR);
    }

    function replaceText(isUKR) {
        if (isUKR) {
            textArray[0].textContent = "Для входу в мережу використовуйте свій логін та цифровий пароль";
            textArray[1].setAttribute("placeholder", "Логін");
            textArray[2].setAttribute("placeholder", "Пароль");
            textArray[3].setAttribute("value", "Вхід");
            textArray[4].textContent = "Якщо у Вас немає логіна та пароля, Ви можете ввійти як гість з обмеженими можливостями";
            textArray[5].textContent = "Відділ КІТ ЛНУП";
        }
        else {
            textArray[0].textContent = "Use your login and digital password to connect to the Internet";
            textArray[1].setAttribute("placeholder", "Login");
            textArray[2].setAttribute("placeholder", "Password");
            textArray[3].setAttribute("value", "Connect");
            textArray[4].textContent = "If you do not have a login and password, you can connect as a guest with restrictions";
            textArray[5].textContent = "CIT Department of LNEU";
        }
    }
}