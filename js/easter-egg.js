(() => {
    const logo = document.querySelector("#brand-seal-logo");
    const motto = document.querySelector("p.motto");

    if (!seal || !logo || !motto) return;

    const normalLogoSrc = logo.getAttribute("src");
    const easterEggLogoSrc = "/images/ee-logo.png?v=REPLACE_ME";

    const normalMotto = motto.innerHTML;
    const easterEggMotto = "In Aperto Latet";

    let eggActive = false;
    let lastPointerX = null;
    let lastPointerY = null;

    function clearPointerPosition() {
        lastPointerX = null;
        lastPointerY = null;
    }

    function pointerIsInsideSeal() {
        if (lastPointerX === null || lastPointerY === null) return false;

        const rect = seal.getBoundingClientRect();

        return (
            lastPointerX >= rect.left &&
            lastPointerX <= rect.right &&
            lastPointerY >= rect.top &&
            lastPointerY <= rect.bottom
        );
    }

    function activateEasterEgg() {
        if (!pointerIsInsideSeal() || eggActive) return;

        logo.setAttribute("src", easterEggLogoSrc);
        motto.innerHTML = easterEggMotto;
        eggActive = true;
    }

    function resetEasterEgg() {
        logo.setAttribute("src", normalLogoSrc);
        motto.innerHTML = normalMotto;
        eggActive = false;
    }

    document.addEventListener("pointermove", (event) => {
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;

        if (eggActive && !pointerIsInsideSeal()) {
            resetEasterEgg();
        }
    });

    seal.addEventListener("mouseleave", () => {
        clearPointerPosition();
        resetEasterEgg();
    });

    seal.addEventListener("contextmenu", () => {
        clearPointerPosition();
        resetEasterEgg();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Alt") {
            activateEasterEgg();
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "Alt") {
            resetEasterEgg();
        }
    });

    window.addEventListener("blur", () => {
        clearPointerPosition();
        resetEasterEgg();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearPointerPosition();
            resetEasterEgg();
        }
    });
})();