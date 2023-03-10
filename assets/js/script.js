/* Layout */

const fragment = document.createDocumentFragment();

const bodyElement = document.querySelector('body');

const popUpElement = document.createElement('div');
popUpElement.classList.add('pop-up');
popUpElement.classList.add('hidden');
fragment.appendChild(popUpElement);

const popUpContentElement = document.createElement('div');
popUpContentElement.classList.add('pop-up-content');
popUpElement.appendChild(popUpContentElement);

const headerElement = document.createElement('header');
headerElement.classList.add('header');
fragment.appendChild(headerElement);

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
fragment.appendChild(mainElement);

bodyElement.appendChild(fragment);

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

let sum = 0;

const cartSumElement = document.createElement('p');
cartSumElement.classList.add('cart-sum');
cartSumElement.innerText = `Total: ${sum}$`;
cartElement.appendChild(cartSumElement);

const cart = document.querySelector('.cart');

const cartCardsContainer = document.createElement('div');
cartCardsContainer.classList.add('cards-container');
cart.appendChild(cartCardsContainer);

const confirmContainer = document.createElement('div');
confirmContainer.classList.add('confirm-container');
cart.appendChild(confirmContainer);

const confirmBtn = document.createElement('a');
confirmBtn.href = '#';
confirmBtn.classList.add('confirmBtn', 'hidden');
confirmBtn.innerText = 'Confirm';
confirmContainer.append(confirmBtn);


/* Books rendering */

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
    })

}

/* Popup */
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-info')) {
        popUpElement.classList.remove('hidden');
        popUpRender(event);
    }
});

function popUpRender(event) {
    let bookNum = event.target.parentElement.dataset.id;
    const popUpCard = document.querySelector('.pop-up-content');

    popUpCard.innerHTML = `
            <button class="pop-up-close" type="button">
            <span class="material-icons">close</span>
             </button>
            <img class="book-img" src="${booksArray[bookNum].imageLink}" alt="">
            <h3 class="book-title">${booksArray[bookNum].title}</h3>
            <h4 class="book-subtitle">${booksArray[bookNum].author}</h4>
            <p class="book-desc">${booksArray[bookNum].description}</p>
            `

    const popUpCloseBtn = document.querySelector('.pop-up-close');

    popUpCloseBtn.addEventListener('click', () => {
        popUpElement.classList.add('hidden');
        document.body.classList.remove('stop-scrolling');

    });

    document.body.classList.add('stop-scrolling');

    //???????????????? ?????????????????????? ?????????????????????????? ?????????? ?????? ?????????????????????? ???? ??????????????
}


/* Add to cart */

/* Add btn */

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-buy')) {
        addToCartClicked(event);
    }
});

function addToCartClicked(event) {
    let book = booksArray.find(book => book.id === Number(event.target.parentElement.dataset.id));
    renderCardInCart(book);
}

/* Drag and drop */

window.addEventListener('dragstart', function(event) {
    if (event.target.classList.contains('book-card')) {
        let card = event.target;
        card.classList.add('book-dragging');
    }
});

window.addEventListener('dragend', function(event) {
    if (event.target.classList.contains('book-card')) {
        let card = event.target;
        card.classList.remove('book-dragging');
    }
});


window.addEventListener('dragover', function(event) {
        event.preventDefault();
});

window.addEventListener('drop', function(event) {
    if (event.target.classList.contains('cart') || event.target.parentElement.classList.contains('book-card-cart')) {
        const draggable = document.querySelector('.book-dragging');
        let book = booksArray.find(book => book.id === Number(draggable.dataset.id));
        renderCardInCart(book);
    }

});


/* Cart render */

function renderCardInCart(book) {
    const foundItem = cart.querySelector(`[data-id="${book.id}"]`);

    if(foundItem) {
        let count = ++foundItem.dataset.counter;
        let bookQuant = foundItem.children[3];
        bookQuant.innerHTML = `Quantity: ${foundItem.dataset.counter}`;
        updateSum(book.price, 1)

    } else {
        updateSum(book.price, 1);

        const cardContainer = document.querySelector('.cards-container');
        const addItemCard = document.createElement('div');
        addItemCard.classList.add('book-card-cart');
        addItemCard.setAttribute('data-id', book.id);
        addItemCard.setAttribute('data-counter', 1);
        cardContainer.appendChild(addItemCard);

                addItemCard.innerHTML= `
            <h3 class="book-title">${book.title}</h3>
            <h4 class="book-subtitle">${book.author}</h4>
            <p class="book-price">Price: ${book.price}$</p>
            <div class="book-quantity">Quantity: 1</div>
            `

        const cardCloseBtn = document.createElement('button');
        cardCloseBtn.classList.add('pop-up-close');
        addItemCard.appendChild(cardCloseBtn);

        const cardCloseSpan = document.createElement('span');
        cardCloseSpan.classList.add('material-icons');
        cardCloseSpan.innerText = "close";
        cardCloseBtn.appendChild(cardCloseSpan);

        cardCloseBtn.addEventListener('click', () => {
            cardCloseBtn.parentElement.remove();
            let book = booksArray.find(book => book.id === Number(cardCloseBtn.parentElement.dataset.id));
            updateSum(book.price*-1, Number(cardCloseBtn.parentElement.dataset.counter));
        });
    }

    }

let result = 0;

function updateSum(sum, count) {
    result+=sum*count;
    const cartSumElement = document.querySelector('.cart-sum');
    cartSumElement.innerText = `Total: ${result}$`;
    if (result) {
        confirmBtnUpdate(true);
    } else {
        confirmBtnUpdate(false);
    }
}

function confirmBtnUpdate(arg) {
    if (arg) {
        confirmBtn.classList.remove('hidden');
    } else {
        confirmBtn.classList.add('hidden');
    }

}













