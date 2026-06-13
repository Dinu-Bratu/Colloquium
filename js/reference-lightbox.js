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

    function trackReferenceEvent(link) {
        const eventName = link.dataset.referenceEvent;

        if (eventName && window.umami) {
            window.umami.track(eventName);
        }
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

        positionReferenceLightbox();

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

    function positionReferenceLightbox() {
        const articleColumn = document.querySelector("main");

        if (!articleColumn) {
            modal.style.setProperty("--reference-lightbox-left", "1rem");
            modal.style.setProperty("--reference-lightbox-calculated-width", "calc(100vw - 2rem)");
            return;
        }

        const rect = articleColumn.getBoundingClientRect();
        const viewportPadding = 16;

        const left = Math.max(rect.left, viewportPadding);
        const width = Math.min(rect.width, window.innerWidth - (viewportPadding * 2));

        modal.style.setProperty("--reference-lightbox-left", `${left}px`);
        modal.style.setProperty("--reference-lightbox-calculated-width", `${width}px`);
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            trackReferenceEvent(link);
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