document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("lightbox-modal");
    const modalImage = document.getElementById("lightbox-modal-image");
    const closeButton = document.querySelector(".lightbox-close");
    const images = document.querySelectorAll(".lightbox-image");

    if (!modal || !modalImage || !closeButton || images.length === 0) {
        return;
    }

    function getVisibleMastheadImage(clickedImage) {
        const trigger = clickedImage.closest(".ee-trigger");

        if (!trigger) {
            return clickedImage;
        }

        const defaultImage = trigger.querySelector(".ee-logo-default");
        const easterEggImage = trigger.querySelector(".ee-logo-easter-egg");

        if (document.body.classList.contains("easter-egg-active") && easterEggImage) {
            return easterEggImage;
        }

        return defaultImage || clickedImage;
    }

    function openLightbox(image) {
        const visibleImage = getVisibleMastheadImage(image);

        modalImage.src = visibleImage.src;
        modalImage.alt = visibleImage.alt || image.alt || "";
        modal.showModal();
    }

    function closeLightbox() {
        modal.close();
        modalImage.src = "";
        modalImage.alt = "";
    }

    images.forEach((image) => {
        image.addEventListener("click", () => {
            openLightbox(image);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeLightbox();
        }
    });
});