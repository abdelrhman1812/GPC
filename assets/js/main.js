document.addEventListener("DOMContentLoaded", () => {
  // Initialize all image comparison sliders
  const sliders = document.querySelectorAll(".image-comparison-container");

  sliders.forEach((slider) => {
    const sliderHandle = slider.querySelector(".slider-handle");
    const imageAfter = slider.querySelector(".image-after");

    // Variables for touch/mouse events
    let isDragging = false;

    // Function to handle the slider movement
    function moveSlider(e) {
      if (!isDragging) return;

      // Get the slider container's bounds
      const rect = slider.getBoundingClientRect();

      // Calculate the position (clientX for mouse, touches[0].clientX for touch)
      const clientX = e.clientX || e.touches[0].clientX;

      // Calculate position as a percentage of the container width
      let position = ((clientX - rect.left) / rect.width) * 100;

      // Constrain position between 0% and 100%
      position = Math.max(0, Math.min(position, 100));

      // Update the width of the "after" image and the position of the slider handle
      imageAfter.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
    }

    // Mouse events
    sliderHandle.addEventListener("mousedown", () => {
      isDragging = true;
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    window.addEventListener("mousemove", moveSlider);

    // Touch events for mobile
    sliderHandle.addEventListener(
      "touchstart",
      () => {
        isDragging = true;
      },
      { passive: true }
    );

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    window.addEventListener("touchmove", moveSlider, { passive: true });

    // Double-click to reset to middle
    slider.addEventListener("dblclick", () => {
      imageAfter.style.width = "50%";
      sliderHandle.style.left = "50%";
    });
  });

  // Get all toggle containers
  const toggleContainers = document.querySelectorAll(".image-toggle-container");

  toggleContainers.forEach((container) => {
    const beforeImage = container.querySelector(".before-image");
    const afterImage = container.querySelector(".after-image");
    const beforeBtn = container.querySelector(".before-btn");
    const afterBtn = container.querySelector(".after-btn");

    // Add click event to Before button
    beforeBtn.addEventListener("click", function () {
      // Show before image, hide after image
      beforeImage.classList.add("active");
      afterImage.classList.remove("active");

      // Update button states
      beforeBtn.classList.add("active");
      afterBtn.classList.remove("active");
    });

    // Add click event to After button
    afterBtn.addEventListener("click", function () {
      // Show after image, hide before image
      afterImage.classList.add("active");
      beforeImage.classList.remove("active");

      // Update button states
      afterBtn.classList.add("active");
      beforeBtn.classList.remove("active");
    });
  });
});
