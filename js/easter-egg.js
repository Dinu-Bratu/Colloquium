(() => {
    const trigger = document.querySelector(".ee-logo-default");
    const easterEggLogo = document.querySelector(".ee-logo-easter-egg");

    if (!trigger || !easterEggLogo) return;

    const clsActive = "easter-egg-active";
    const lingerDelayMs = 1000;
    const lingerFadeMs = 1000;
    const resetFadeMs = 1000;

    let mouseIsInsideLogo = false;
    let eggActive = false;
    let lingerTimer = null;

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
        trigger.classList.add(clsActive);
        document.body.classList.add(clsActive);

        eggActive = true;
    }

    function resetEasterEgg() {
        clearLingerTimer();

        if (!eggActive) return;

        easterEggLogo.style.transitionDuration = `${resetFadeMs}ms`;
        trigger.classList.remove(clsActive);
        document.body.classList.remove(clsActive);

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