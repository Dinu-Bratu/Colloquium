document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("lightbox-modal");
    const modalImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const triggers = document.querySelectorAll(".lightbox-trigger img");

    if (!modal || !modalImage || !closeButton || triggers.length === 0) {
        return;
    }

    function openModal(image) {
        modalImage.src = image.src;
        modalImage.alt = image.alt || "";
        document.body.classList.add("lightbox-open");
        modal.showModal();
    }

    function closeModal() {
        modal.close();
        modalImage.src = "";
        modalImage.alt = "";
        document.body.classList.remove("lightbox-open");
    }

    triggers.forEach((image) => {
        image.parentElement.addEventListener("click", () => {
            openModal(image);
        });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        const modalRect = modal.getBoundingClientRect();

        const clickedInDialog =
            event.clientX >= modalRect.left &&
            event.clientX <= modalRect.right &&
            event.clientY >= modalRect.top &&
            event.clientY <= modalRect.bottom;

        if (!clickedInDialog) {
            closeModal();
        }
    });
});