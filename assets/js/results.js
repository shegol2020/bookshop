const resultList = document.querySelector(".results");
let resultObj = {};
new URLSearchParams(window.location.search).forEach((value, key) => {
    resultObj[key] = value;
    resultList.innerHTML = `
            <h1 class="result-heading">Thanks for your order!</h1>
            <div class="result-text">The delivery address is ${resultObj.street} street, house ${resultObj.houseNumber}, flat ${resultObj.flatNumber}. 
            Customer ${resultObj.name} ${resultObj.surname}
`
});


