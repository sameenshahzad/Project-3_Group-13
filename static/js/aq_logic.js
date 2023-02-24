// radio buttton
const radios = document.querySelectorAll('input[name="exampleRadios"]');
const optionsToShow = document.querySelectorAll('.div-to-show');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedOption = radio.value;
    optionsToShow.forEach(div => {
      if (div.classList.contains(selectedOption)) {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });
  });
});
// radio buttton

// Load data 


  