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
    let mottoTimer = null;

    function clearLingerTimer() {
        if (lingerTimer !== null) {
            clearTimeout(lingerTimer);
            lingerTimer = null;
        }
    }

    function clearMottoTimer() {
        if (mottoTimer !== null) {
            clearTimeout(mottoTimer);
            mottoTimer = null;
        }
    }

    function setMottoText(text, durationMs) {
        clearMottoTimer();

        const halfDurationMs = durationMs / 2;

        motto.style.transitionDuration = `${halfDurationMs}ms`;
        motto.classList.add("motto-fading");

        mottoTimer = setTimeout(() => {
            motto.innerHTML = text;
            motto.classList.remove("motto-fading");
            mottoTimer = null;
        }, halfDurationMs);
    }

    function activateEasterEgg() {
        if (!mouseIsInsideLogo || eggActive) return;

        clearLingerTimer();

        easterEggLogo.style.transitionDuration = `${lingerFadeMs}ms`;
        trigger.classList.add("easter-egg-active");

        setMottoText(easterEggMotto, lingerFadeMs);

        eggActive = true;
    }

    function resetEasterEgg() {
        clearLingerTimer();

        if (!eggActive) return;

        easterEggLogo.style.transitionDuration = `${resetFadeMs}ms`;
        trigger.classList.remove("easter-egg-active");

        setMottoText(normalMotto, resetFadeMs);

        eggActive = false;
    }

    trigger.addEventListener("mouseenter", () => {
        mouseIsInsideLogo = true;

        clearLingerTimer();

        lingerTimer = setTimeout(() => {
            activateEasterEgg();
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