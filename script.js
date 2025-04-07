const container = document.querySelector('.container');

//Storing book objects in this array
const myLibrary = [];

//The constructor for the book
function Book(title, author, hasRead){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.hasRead = hasRead;
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

showButton.addEventListener("click", () => {
    document.getElementById("bookform").reset();
    favDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const completed = document.getElementById("readToggle").checked;

    // console.log(title, author, completed);
    addBookToLibrary(title, author, completed);
    favDialog.close();
    renderLibrary();
    console.log(myLibrary);
})

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
