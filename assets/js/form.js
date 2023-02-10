const name = document.querySelector('#name');
const surname = document.querySelector('#surname');
const street = document.querySelector('#street');
const houseNumber = document.querySelector('#houseNumber');
const flatNumber = document.querySelector('#flatNumber');
const deliveryDate = document.querySelector('#deliveryDate');

name.addEventListener('blur', () => console.log("change"));