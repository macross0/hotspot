var buttonUKR = document.getElementById("ukr");
var buttonENG = document.getElementById("eng");
var oppositeLanguage;

var isFirefox = navigator.userAgent.search("Firefox") > -1;
var isIE = navigator.userAgent.search('MSIE ') > -1 || navigator.userAgent.search('Trident/') > -1;

// Run auto language switch at page load
window.onload = startup;

function startup() {

    // Detect html filename and set sender variable for proper text replacement
    let filename = window.location.pathname.split("/").pop();
    if (filename == "login.html")
        var sender = "login";
    else if (filename == "status.html")
        var sender = "status";

    if (isIE) {
        var switcher = document.getElementById("lang-switcher");
        switcher.parentNode.removeChild(switcher);
    }
    
    try {
        buttonUKR.style.transitionTimingFunction = "steps(1, jump-start)";
        buttonENG.style.transitionTimingFunction = "steps(1, jump-start)";
    
        var userLang = navigator.language || navigator.userLanguage;
        if (userLang == "uk" || userLang == "uk-UA" || userLang == "ukr" || userLang == "rus" || userLang == "ru-RU" || userLang == "ru") {
            oppositeLanguage = "eng";
            updateSwitcher(buttonUKR, sender, true);
        }
        else {
            oppositeLanguage = "ukr";
            updateSwitcher(buttonENG, sender, true);
        }
    
        setTimeout(function () {
            buttonUKR.style.transitionTimingFunction = "ease-in-out";
            buttonENG.style.transitionTimingFunction = "ease-in-out";
        }, 100);
    }
    catch(TypeError) {
        console.log("something is borked");
        return;
    }
}


function updateSwitcher(self, sender, startup) {
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
        self.style.backgroundPosition = "0 0";
        buttonENG.style.backgroundPosition = "100% 0";

        background.style.transform = "translate(0, 0)";
	    background.style.borderRadius = "3px 0 0 3px";

        self.style.cursor = "default";
        buttonENG.style.cursor = "pointer";

        changeLanguage(sender, true, startup);
    }
    else {
        self.style.backgroundPosition = "0 0";
        buttonUKR.style.backgroundPosition = "-100% 0";

        background.style.transform = "translate(100%, 0)";
	    background.style.borderRadius = "0 3px 3px 0";

        self.style.cursor = "default";
        buttonUKR.style.cursor = "pointer";
        
        changeLanguage(sender, false, startup);
    }
}

function changeLanguage(sender, isUKR, startup) {

    if (sender == "login")
        var textArray = document.querySelectorAll("#connect-hint, #input-login, #input-password, #connect-button, #guest-connect, #footer-text");
    else if (sender == "status")
        var textArray = document.querySelectorAll("h1, .outside-link, #connect-button, #footer-link");

        // remove this later before release
        console.log(textArray);

    if (!startup) {
        // Fade out
        Array.prototype.forEach.call(textArray, function(element) {
            if (element.id != "input-login" && element.id !== "input-password") {
                element.style.transition = 'opacity 0.2s ease-in-out';
                element.style.opacity = '0';
            }
            else if (!isFirefox) {
                element.classList.remove('placeholder-opacity-full');
                element.classList.add('placeholder-opacity-zero');
            }
        }); 

        // Change text, fade in in 0.2 second
        setTimeout(function() {
            replaceText(sender, isUKR);
            Array.prototype.forEach.call(textArray, function(element) {
                if (element.id != "input-login" && element.id !== "input-password") {
                    element.style.opacity = '1';
                }
                else if (!isFirefox) {
                    element.classList.remove('placeholder-opacity-zero');
                    element.classList.add('placeholder-opacity-full');
                }
            });
        }, 200);

        // Restore transitions at the end
        setTimeout(function() {
            if (sender == "login") {
                Array.prototype.forEach.call(textArray, function(element) {
                    if (element.id != "input-login" && element.id !== "input-password") {
                        element.style.transition = '0.4s ease-in-out';
                    }
                });
            }     
            else if (sender == "status") {
                Array.prototype.forEach.call(textArray, function(element) {
                    if (element.className == "outside-link") {
                        element.style.transition = 'box-shadow 0.25s ease-in-out';
                    }
                    else {
                        element.style.transition = '0.4s ease-in-out';
                    }
                });
            }
        }, 400);
    }
    else {
        replaceText(sender, isUKR);
    }

    function replaceText(sender, isUKR) {
        if (sender == "login") {
            if (isUKR) {
                textArray[0].textContent = "Для входу в мережу використовуйте свій логін та цифровий пароль";
                textArray[1].setAttribute("placeholder", "Логін");
                textArray[2].setAttribute("placeholder", "Пароль");
                textArray[3].setAttribute("value", "Вхід");
                textArray[4].textContent = "Якщо у Вас немає логіна та пароля, натисніть тут, щоб увійти як гість з обмеженими можливостями";
                textArray[5].textContent = "Відділ КІТ ЛНУП";
            }
            else {
                textArray[0].textContent = "Use your login and digital password to connect to the Internet";
                textArray[1].setAttribute("placeholder", "Login");
                textArray[2].setAttribute("placeholder", "Password");
                textArray[3].setAttribute("value", "Connect");
                textArray[4].textContent = "If you do not have a login and password, click here to connect as a guest with restrictions";
                textArray[5].textContent = "CIT Department of LNEU";
            }
        }

        else if (sender == "status") {
            if (isUKR) {
                if (textArray[0].id == "trial")
                    textArray[0].textContent = "Ви під'єднались в гостьовому режимі!";
                else
                    textArray[0].textContent = "Ви під'єднались як $(username)!";
                textArray[1].textContent = "Офіційний вебсайт Львівського національного університету природокористування";
                textArray[1].style.lineHeight = "20px";

                textArray[2].textContent = "Технічна підтримка";
                textArray[3].setAttribute("value", "Вихід з мережі");
                textArray[4].textContent = "Відділ КІТ ЛНУП";
            }
            else {  
                if (textArray[0].id == "trial")
                    textArray[0].textContent = "You connected as guest!";
                else
                    textArray[0].textContent = "You connected as $(username)!";
                textArray[1].textContent = "Official Lviv National Enviromental University website";
                textArray[1].style.lineHeight = "30px";

                textArray[2].textContent = "Technical support";
                textArray[3].setAttribute("value", "Disconnect");
                textArray[4].textContent = "CIT Department of LNEU";
            }
        }
    }
}