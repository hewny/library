let myLibrary = [];

function Book() {
	this.title = '';
	this.author = '';
	this.pages = '';
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages`
	}
}

function addBookToLibrary(e) {
	myLibrary.push(e)
}


function updateBooks() {
	// clear previous entries
	container.querySelectorAll('div').forEach(div => div.remove())
	
	// reload books
	for (let i=0; i < myLibrary.length; i++) {
		newDiv = document.createElement("div");
		newDiv.className = "book";
		newDiv.textContent = `${myLibrary[i].title}`;
		container.appendChild(newDiv)
		console.log(myLibrary)
	}
}

// function createInputFields () {
// 	// create title input field
// 	titleField = document.createElement('input')
// 	titleField.id = 'inputTitle'
// 	titleFieldLable = document.createElement('label')
// 	titleFieldLable.for = 'inputTitle'
// 	titleFieldLable.textContent = "Title"
// 	modalContent.appendChild(titleFieldLable)
// 	modalContent.appendChild(titleField)
// 	// create author input field
// 	titleField = document.createElement('input')
// 	titleField.id = 'inputAuthor'
// 	titleFieldLable = document.createElement('label')
// 	titleFieldLable.for = 'inputAuthor'
// 	titleFieldLable.textContent = "Author"
// 	modalContent.appendChild(titleFieldLable)
// 	modalContent.appendChild(titleField)
	
// 	// create pages input field
// 	titleField = document.createElement('input')
// 	titleField.id = 'inputPages'
// 	titleFieldLable = document.createElement('label')
// 	titleFieldLable.for = 'inputPages'
// 	titleFieldLable.textContent = "Pages"
// 	modalContent.appendChild(titleFieldLable)
// 	modalContent.appendChild(titleField)
	
// 	// create submit button
// 	submitButton = document.createElement('button')
// 	submitButton.textContent = "Click to add the book"
// 	submitButton.addEventListener('click', getValues)
// 	modalContent.appendChild(submitButton)
// }

function getValues() {
	newBook = new Book()
	newBook.title = document.querySelector('#inputTitle').value
	console.log(newBook.title)
	addBookToLibrary(newBook)
}

function logconsole(e) {
	console.log(e)
}

const container = document.querySelector(".container");
const modalOverlay = document.querySelector('.modal-overlay');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('.modal-content');

const addButton = document.querySelector('.add-button');
const addExampleButton = document.querySelector('.add-example-button');
const addBookButton = document.querySelector('.add-book-button');
const closeButton = document.querySelector('.close-button');

function showModal() {
	modalOverlay.classList.remove('closed')
	modalContainer.classList.remove('closed')
}

function hideModal() {
	modalOverlay.classList.add('closed')
	modalContainer.classList.add('closed')
}

addButton.addEventListener('click', showModal)
closeButton.addEventListener('click',hideModal)
