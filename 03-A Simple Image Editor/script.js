const imgBox = document.querySelector('.imgBox');
const imgSelector = document.querySelector('.imgBox input');
const inputs = document.querySelectorAll('.controls input');
const reset = document.querySelector('.reset');

const initial = {
    brightness: 100,
    contrast: 100,
    hue: 0,
    saturate: 1,
    sepia: 0
}

inputs.forEach(input => input.addEventListener('change', handleChanges));

imgSelector.addEventListener('change', getImage);
reset.addEventListener('click', resetValue);

function getImage() {
    const img = document.createElement('img');
    let beforeImg = document.querySelector('.imgBox img');
    if (beforeImg) beforeImg.remove();

    img.src = URL.createObjectURL(imgSelector.files[0]);
    imgBox.appendChild(img);
}

function handleChanges() {
    const suffix = this.dataset.sizing || '';

    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

function resetValue() {
    inputs.forEach(input => {
        const suffix = input.dataset.sizing || '';

        let inputName = input.name;
        let initialValue = initial[inputName];

        input.value = initialValue;
        document.documentElement.style.setProperty(`--${input.name}`, initialValue + suffix);

    });
}
