document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("lightbox-modal");
    const modalImage = document.getElementById("lightbox-modal-image");
    const closeButton = document.querySelector(".lightbox-close");
    const images = document.querySelectorAll(".lightbox-image");

    if (!modal || !modalImage || !closeButton || images.length === 0) {
        return;
    }

    function openLightbox(image) {
        modalImage.src = image.src;
        modalImage.alt = image.alt || "";
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