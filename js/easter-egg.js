(() => {
    const trigger = document.querySelector("#masthead-logo-trigger");
    const easterEggLogo = document.querySelector("#masthead-logo-easter-egg");
    const motto = document.querySelector("#masthead-motto");

    if (!trigger || !easterEggLogo || !motto) return;

    const normalMotto = motto.innerHTML;
    const easterEggMotto = "In Aperto Latet";

    const lingerDelayMs = 1200;
    const lingerFadeMs = 1200;
    const resetFadeMs = 1200;

    let mouseIsInsideLogo = false;
    let eggActive = false;
    let lingerTimer = null;
    let sequence = 0;

    function clearLingerTimer() {
        if (lingerTimer !== null) {
            clearTimeout(lingerTimer);
            lingerTimer = null;
        }
    }

function activateEasterEgg() {
    if (!mouseIsInsideLogo || eggActive) return;

    clearLingerTimer();

    easterEggLogo.style.transitionDuration = `${lingerFadeMs}ms`;
    trigger.classList.add("easter-egg-active");
    document.body.classList.add("easter-egg-active");

    eggActive = true;
}
    function resetEasterEgg() {
        clearLingerTimer();

        if (!eggActive) return;

        easterEggLogo.style.transitionDuration = `${resetFadeMs}ms`;
        trigger.classList.remove("easter-egg-active");
        document.body.classList.remove("easter-egg-active");

        eggActive = false;
    }

    trigger.addEventListener("mouseenter", () => {
        mouseIsInsideLogo = true;

        clearLingerTimer();

        lingerTimer = setTimeout(() => {
            lingerTimer = null;

            if (mouseIsInsideLogo) {
                activateEasterEgg();
            }
        }, lingerDelayMs);
    });

    trigger.addEventListener("mouseleave", () => {
        mouseIsInsideLogo = false;
        resetEasterEgg();
    });

    trigger.addEventListener("contextmenu", () => {
        resetEasterEgg();
    });

    window.addEventListener("blur", () => {
        mouseIsInsideLogo = false;
        resetEasterEgg();
    });
})();