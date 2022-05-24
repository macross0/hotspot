let isUKR = true;

function disableTransitionOnLoad() {
    let buttonUKR = document.getElementById("ukr");
    let buttonENG = document.getElementById("eng");
    buttonUKR.style.transition = "none !important";
    buttonENG.style.transition = "none !important";
    console.log('yes');
}

function switchLanguage() {

    let buttonUKR = document.getElementById("ukr");
    let buttonENG = document.getElementById("eng");

    let background = document.getElementById("lang-background");

    if (isUKR) {
        buttonUKR.style.backgroundPosition = "0 0";
        buttonENG.style.backgroundPosition = "100% 0";

        background.style.transform = "translate(0, 0)";
	    background.style.borderRadius = "3px 0 0 3px";
    }
    else {
        
        buttonUKR.style.backgroundPosition = "-100% 0";
        buttonENG.style.backgroundPosition = "0 0";

        background.style.transform = "translate(100%, 0)";
	    background.style.borderRadius = "0 3px 3px 0";
    }

    isUKR = !isUKR
}

window.onload = switchLanguage;