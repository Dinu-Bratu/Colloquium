(() => {
    const logo = document.querySelector("#masthead-logo");
    const motto = document.querySelector("p.motto");

    if (!logo || !motto) return;

    const normalLogoSrc = logo.getAttribute("src");
    const easterEggLogoSrc = "/images/logo-easter-egg.png?v=3E05BC66";

    const normalMotto = motto.innerHTML;
    const easterEggMotto = "In Aperto Latet";

    let mouseIsInsideLogo = false;
    let eggActive = false;

    function activateEasterEgg() {
        if (!mouseIsInsideLogo || eggActive) return;

        logo.setAttribute("src", easterEggLogoSrc);
        motto.innerHTML = easterEggMotto;
        eggActive = true;
    }

    function resetEasterEgg() {
        logo.setAttribute("src", normalLogoSrc);
        motto.innerHTML = normalMotto;
        eggActive = false;
    }

    logo.addEventListener("mouseenter", () => {
        mouseIsInsideLogo = true;
    });

    logo.addEventListener("mouseleave", () => {
        mouseIsInsideLogo = false;
        resetEasterEgg();
    });

    logo.addEventListener("contextmenu", resetEasterEgg);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Alt" && mouseIsInsideLogo) {
            activateEasterEgg();
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "Alt") {
            resetEasterEgg();
        }
    });

    window.addEventListener("blur", () => {
        mouseIsInsideLogo = false;
        resetEasterEgg();
    });
})();