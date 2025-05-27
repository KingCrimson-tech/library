const container = document.querySelector('.container');

//Storing book objects in this array
const myLibrary = [];

//Class for the book
class Book{
    constructor(title, author, hasRead){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.hasRead = hasRead;
    }
}

//Helper function to add books
function addBookToLibrary(title, author, hasRead){
    const b = new Book(title, author, hasRead);
    myLibrary.push(b);
}

const showButton = document.getElementById('add-book');
const favDialog = document.getElementById('favDialog');
const selectEl = favDialog.querySelector("fieldset");
const confirmBtn = document.getElementById('added-book');
const bookForm = document.getElementById('bookform');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

titleInput.addEventListener('input', checkForm);
authorInput.addEventListener('input', checkForm);

showButton.addEventListener("click", () => {
    document.getElementById("bookform").reset();
    favDialog.showModal();
});

// Remove the separate confirmBtn click handler and use form submit
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Check form validity
    if (!bookForm.checkValidity()) {
        checkForm();
        return;
    }

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const completed = document.getElementById("readToggle").checked;

    addBookToLibrary(title, author, completed);
    favDialog.close();
    renderLibrary();
    console.log(myLibrary);
});

function renderLibrary(){
    container.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author : ${book.author}</p>
        <p>Status: <span class="status">${book.hasRead ? 'Read' : 'Not Read'}</span></p>
        <button class="toggle-btn">${book.hasRead ? 'Mark as Unread' : 'Mark as Read'}</button>
        <button class="delete-btn">Delete</button>
        `;

        card.querySelector('.toggle-btn').addEventListener('click', () => {
            book.hasRead = !book.hasRead;
            renderLibrary();
        })

        card.querySelector('.delete-btn').addEventListener('click', () => {
            myLibrary.splice(index, 1);
            renderLibrary();
        })

        container.appendChild(card);
    })
}

function checkForm(){
    const titleError = document.getElementById('title-error');
    const authorError = document.getElementById('author-error');

    if(titleInput.validity.valueMissing){
        titleInput.setCustomValidity("This field is required!");
        titleError.textContent = "Please enter a book title";
    }else{
        titleInput.setCustomValidity("");
        titleError.textContent = "";
    }

    if(authorInput.validity.valueMissing){
        authorInput.setCustomValidity("This field is required!");
        authorError.textContent = "Please enter an author name";
    }else{
        authorInput.setCustomValidity("");
        authorError.textContent = "";
    }
}