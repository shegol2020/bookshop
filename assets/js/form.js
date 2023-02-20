
let result = {};

const init = function(){
    document.querySelectorAll(".delivery").forEach(input => {
        input.addEventListener('blur', deliveryInputsCheck)
    });
    document.getElementById("deliveryDate").addEventListener("click", deliveryInputsCheck);
    document.querySelectorAll(".radio").forEach(input => {
        input.addEventListener('click', deliveryInputsCheck)
    });
    document.querySelectorAll(".gift").forEach(el => {
        el.addEventListener('click', checkboxCount)
    });
};

const deliveryInputsCheck = function (ev) {
    //delivery text inputs check
    let pattern;
    switch (ev.srcElement.id) {
        case 'name':
            pattern = /[^0-9 ]{4,}/;
        case 'surname':
            pattern = /[^0-9 ]{5,}/;
            break;
        case 'street':
            pattern = /[a-zA-Z 0-9]+/;
            break;
        case 'houseNumber':
            pattern = /^[1-9]+[0-9]*$/;
            break;
        case 'flatNumber':
            pattern = /^[1-9]+[0-9-]*$/;
            break;
    }
    if (ev.srcElement.classList.contains('delivery') && ev.srcElement.value.match(pattern)) {
        ev.srcElement.parentElement.classList.add('valid');
        ev.srcElement.parentElement.classList.remove('invalid');
    }
    if (ev.srcElement.classList.contains('delivery') && !ev.srcElement.value.match(pattern)) {
        ev.srcElement.parentElement.classList.add('invalid');
        ev.srcElement.parentElement.classList.remove('valid');
    }

    const deliveryAmount = document.querySelectorAll(".valid");
    result.deliveryText = deliveryAmount.length === 5;

    //delivery date input
    let tomorrow = new Date();
    let dd = tomorrow.getDate()+ 1;
    let mm = tomorrow.getMonth() + 1; //January is 0!
    let yyyy = tomorrow.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    tomorrow = yyyy + '-' + mm + '-' + dd;
    document.getElementById("deliveryDate").setAttribute("min", tomorrow);

    const dateInput = document.getElementById("deliveryDate");
    result.dateInput = !!dateInput.value;

    // radio check
    if(ev.srcElement.classList.contains('radio') && ev.srcElement.checked) {
        result.radio = true;
    };

    //check result
    if (result.deliveryText && result.radio && result.dateInput) {
        document.querySelector('.submitFormBtn').removeAttribute('disabled');
    } else {
        document.querySelector('.submitFormBtn').setAttribute('disabled', "");
    }
};

const checkboxCount = function(){

    let giftChkbx = document.querySelectorAll('.gift');
    const checkedInputsAmount = Array.from(giftChkbx).filter(input => input.checked === true).length;
    const giftsInfoContainer = document.querySelector(".giftsInfo");
    const chkBoxInputs = giftsInfoContainer.querySelectorAll('input');

    if (checkedInputsAmount === 2) {
        for (let input of chkBoxInputs) {
            if (!input.checked) {
                input.disabled = true;
            }
        }
    } else {
        for (let input of chkBoxInputs) {
            if (input.disabled) {
                input.disabled = false;
            }
        }
    }

};

document.addEventListener('DOMContentLoaded', init);
