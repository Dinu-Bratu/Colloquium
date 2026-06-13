document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("reference-lightbox");
    const content = document.getElementById("reference-lightbox-content");
    const closeButton = document.querySelector(".reference-lightbox-close");
    const links = document.querySelectorAll(".reference-link[data-reference]");

    if (!modal || !content || !closeButton || links.length === 0) {
        return;
    }

    function preserveScrollPosition(scrollY) {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: scrollY,
                left: window.scrollX,
                behavior: "auto"
            });
        });
    }

    async function openReference(referenceUrl) {
        const scrollY = window.scrollY;

        content.innerHTML = "<p>Loading reference…</p>";

        try {
            const response = await fetch(referenceUrl, {
                cache: "no-cache"
            });

            if (!response.ok) {
                throw new Error(`Unable to load reference: ${response.status}`);
            }

            content.innerHTML = await response.text();
        } catch (error) {
            content.innerHTML = "<p>Unable to load this reference.</p>";
            console.error(error);
        }

        modal.showModal();
        preserveScrollPosition(scrollY);
    }

    function closeReference() {
        const scrollY = window.scrollY;

        if (modal.open) {
            modal.close();
        }

        content.innerHTML = "";
        preserveScrollPosition(scrollY);
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openReference(link.dataset.reference);
        });
    });

    closeButton.addEventListener("click", closeReference);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.open) {
            event.preventDefault();
            closeReference();
        }
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeReference();
        }
    });

    modal.addEventListener("close", () => {
        content.innerHTML = "";
    });
});