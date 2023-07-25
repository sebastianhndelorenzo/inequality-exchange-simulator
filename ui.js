// Grab all sliders
const sliders = document.querySelectorAll(".slider");

// Iterate over each slider and attach an input event
sliders.forEach((slider) => {
    slider.addEventListener('input', function() {
        const valueDisplay = this.parentElement.querySelector('.slider-value');
        valueDisplay.textContent = this.value;
    });
});
