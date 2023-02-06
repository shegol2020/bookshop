const bodyElement = document.querySelector('body');

const popUpElement = document.createElement('div');
popUpElement.classList.add('pop-up');
popUpElement.classList.add('hidden');
bodyElement.appendChild(popUpElement);

const popUpContentElement = document.createElement('div');
popUpContentElement.classList.add('pop-up-content');
popUpElement.appendChild(popUpContentElement);

const headerElement = document.createElement('header');
headerElement.classList.add('header');
bodyElement.appendChild(headerElement);

const headerTitleElement = document.createElement('h1');
headerTitleElement.classList.add('header-title');
headerElement.appendChild(headerTitleElement);

const headerTitleLinkElement = document.createElement('a');
headerTitleLinkElement.classList.add('header-title-link');
headerTitleLinkElement.href = "#";

headerTitleLinkElement.innerText = "Book shop";
headerTitleElement.appendChild(headerTitleLinkElement);

const mainElement = document.createElement('main');
mainElement.classList.add('main');
bodyElement.appendChild(mainElement);

const mainWrapperElement = document.createElement('div');
mainWrapperElement.classList.add('main-wrapper');
mainElement.appendChild(mainWrapperElement);

const bookSectionElement = document.createElement('section');
bookSectionElement.classList.add('book-cards');
mainWrapperElement.appendChild(bookSectionElement);

const bookHeadingElement = document.createElement('h2');
bookHeadingElement.classList.add('books-cards-heading');
bookHeadingElement.innerText = "Book catalog";
bookSectionElement.appendChild(bookHeadingElement);

const bookListElement = document.createElement('ul');
bookListElement.classList.add('book-list');
bookSectionElement.appendChild(bookListElement);

/* Cart */
const cartElement = document.createElement('aside');
cartElement.classList.add('cart');
mainWrapperElement.appendChild(cartElement);

const cartHeadingElement = document.createElement('h2');
cartHeadingElement.classList.add('cart-heading');
cartHeadingElement.innerText = "Your cart";
cartElement.appendChild(cartHeadingElement);

const cartSumElement = document.createElement('p');
cartSumElement.classList.add('cart-sum');
cartElement.appendChild(cartSumElement);

const cart = document.querySelector('.cart');

const cartCardsContainer = document.createElement('div');
cartCardsContainer.classList.add('cards-container');
cart.appendChild(cartCardsContainer);

const exCart = document.createElement('div');
exCart.classList.add('example-card');
cartCardsContainer.appendChild(exCart);

const createCartBtn = document.createElement('button');
createCartBtn.classList.add('btn-create');
createCartBtn.innerText = "Create";
cartCardsContainer.appendChild(createCartBtn);

createCartBtn.addEventListener('click', createCard);

const clearCartBtn = document.createElement('button');
clearCartBtn.classList.add('btn-clear');
clearCartBtn.innerText = "Clear";
cart.appendChild(clearCartBtn);


clearCartBtn.addEventListener('click', () => {
    const cardsInCart = document.querySelectorAll('.ex-book-price');
    cardsInCart.forEach(card => card.remove());
    updateCart()
});

let booksArray = [];

fetch('../assets/js/books.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        booksArray = data.map((book, index) => {
            book.id = index;
            return book
        });
        renderBooks(booksArray);
    });


function renderBooks(books) {
    books.forEach(book => {

        const bookListItemElement = document.createElement('li');
        bookListItemElement.classList.add('book-card');
        bookListItemElement.setAttribute('draggable', true);
        bookListItemElement.setAttribute('data-id', book.id);
        bookListItemElement.setAttribute('data-price', book.price);
        bookListElement.appendChild(bookListItemElement);

        const bookImgElement = document.createElement('img');
        bookImgElement.classList.add('book-img');
        bookImgElement.setAttribute('src', book.imageLink);
        bookImgElement.setAttribute('alt', '');
        bookListItemElement.appendChild(bookImgElement);

        const bookTitleElement = document.createElement('h3');
        bookTitleElement.classList.add('book-title');
        bookTitleElement.innerText = book.title;
        bookListItemElement.appendChild(bookTitleElement);

        const bookSubtitleElement = document.createElement('h4');
        bookSubtitleElement.classList.add('book-subtitle');
        bookSubtitleElement.innerText = book.author;
        bookListItemElement.appendChild(bookSubtitleElement);

        const bookPriceElement = document.createElement('p');
        bookPriceElement.classList.add('book-price');
        bookPriceElement.innerText = `Price: ${book.price}$`;
        bookListItemElement.appendChild(bookPriceElement);

        const bookBuyBtnElement = document.createElement('button');
        bookBuyBtnElement.classList.add('btn-buy');
        bookBuyBtnElement.innerText = "Add to cart";
        bookListItemElement.appendChild(bookBuyBtnElement);

        const bookInfoBtnElement = document.createElement('button');
        bookInfoBtnElement.classList.add('btn-info');
        bookInfoBtnElement.innerText = "More info";
        bookListItemElement.appendChild(bookInfoBtnElement);

        bookBuyBtnElement.addEventListener('click', addToCartClicked);

    });

}



    // popUpElement.addEventListener('click', () => //Закрывает попап по клику где угодно, можно доделать
    //     popUpElement.classList.add('hidden'))




function createCard() {
    const exCartContainer = document.createElement('div');
    exCartContainer.classList.add('ex-book-container');
    exCart.appendChild(exCartContainer);

    const exCartPriceElement = document.createElement('p');
    exCartPriceElement.classList.add('ex-book-price');
    exCartPriceElement.innerText = `30$`;
    exCartContainer.appendChild(exCartPriceElement);

    const exRemoveBtn = document.createElement('button');
    exRemoveBtn.classList.add('remove-btn');
    exRemoveBtn.innerText = "x";
    exCartContainer.appendChild(exRemoveBtn);

    updateCart()
}

function updateCart() {
    let total = 0;
    const cardsInCart = document.querySelectorAll('.ex-book-container');
    cardsInCart.forEach(card => {
        let priceEl = card.querySelector('.ex-book-price');
        let price = Number(priceEl.innerText.replace("$", ""));
        total+=price;
    });
    document.querySelector(".cart-sum").innerText = total;
}

// removeBtns.forEach(btn => {
//     btn.addEventListener('click', () =>
//     {
//         console.log(btn);
//         btn.parentElement.remove();
//         updateCart();
//     })
// });

/* Drag and drop */
const card = document.querySelectorAll('.book-card');

card.forEach(el => {
    el.addEventListener('dragstart', () => {
        el.classList.add('book-dragging')
    });

    el.addEventListener('dragend', () => {
        el.classList.remove('book-dragging');
        el.classList.add('book-in-cart');

    });
});

cart.addEventListener('dragover', () => {
    const draggable = document.querySelector('.book-dragging')
    draggable.children[4].remove();
    cartElement.appendChild(draggable);
});


/* Add to cart */

function addToCartClicked(event) {
    let book = booksArray.find(book => book.id === Number(event.target.parentElement.dataset.id));
    addItemToCart(book);
}


function addItemToCart(book) {

    const foundItem = cart.querySelector(`[data-id="${book.id}"]`);

    if(foundItem) {
        let count = ++foundItem.dataset.counter;
        let newPrice = book.price*count;
        foundItem.children[2].innerHTML=`Price: ${newPrice}$`;

    } else {
        const addItemCard = document.createElement('div');
        addItemCard.classList.add('book-card-cart');
        addItemCard.setAttribute('data-id', book.id);
        addItemCard.setAttribute('data-counter', 1);
        const cardContainer = document.querySelector('.cards-container');
        cardContainer.appendChild(addItemCard);

        addItemCard.innerHTML= `
            <h3 class="book-title">${book.title}</h3>
            <h4 class="book-subtitle">${book.author}</h4>
            <p class="book-price">Price: ${book.price}$</p>
            `
    }


}




/* Popup */

// bookInfoBtnElement.addEventListener('click', () => {
//     popUpElement.classList.remove('hidden');
//     const popEl = document.querySelector('.pop-up');
//     console.log(popEl, popUpElement);

// const popUpImgElement = popUpElement.createElement('img');
// popUpImgElement.classList.add('book-img');
// popUpImgElement.setAttribute('src', book.imageLink);
// popUpImgElement.setAttribute('alt', '');
// popUpElement.appendChild(popUpImgElement)
//
// const popUpTitleElement = popUpElement.createElement('h3');
// popUpTitleElement.classList.add('book-title');
// popUpTitleElement.innerText = book.title;
// popUpElement.appendChild(bookTitleElement);
//
// const popUpSubtitleElement = popUpElement.createElement('h4');
// popUpSubtitleElement.classList.add('book-subtitle');
// popUpSubtitleElement.innerText = book.author;
// popUpElement.appendChild(popUpSubtitleElement);







