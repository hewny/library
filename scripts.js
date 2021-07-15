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
	clearInput()
	hideModal()
	updateBooks()
}


function updateBooks() {
	// clear previous entries
	cardContainer.querySelectorAll('.card').forEach(div => div.remove())
	
	// reload books
	for (let i=0; i < myLibrary.length; i++) {
		newDiv = document.createElement("div");
		newDiv.className = "card";
		newImg = document.createElement('img');
		newImg.src="book.png"
		newH1 = document.createElement('h1');
		newH1.textContent = myLibrary[i]["title"];
		newH2 = document.createElement('h2');
		newH2.textContent = myLibrary[i]["author"];
		newH3 = document.createElement('h3');
		newH3.textContent = myLibrary[i]["pages"]+" pages";
		
		newDiv.appendChild(newImg);
		newDiv.appendChild(newH1);
		newDiv.appendChild(newH2);
		newDiv.appendChild(newH3);
		cardContainer.appendChild(newDiv);
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
	let newBook = new Book()
	newBook.title = inputTitle.value
	newBook.author = inputAuthor.value
	newBook.pages = inputPages.value
	addBookToLibrary(newBook)
}

function logconsole(e) {
	console.log(e)
}

function evalRead() {
	if (readNo.checked) {
		return false
	}
	else return true
}

function clearInput() {
	inputTitle.value = ""
	inputAuthor.value = ""
	inputPages.value = ""
	readNo.checked = false
	readYes.checked = false
}

const container = document.querySelector(".container");
const modalOverlay = document.querySelector('.modal-overlay');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('.modal-content');
const cardContainer = document.querySelector('.card-container')

const addButton = document.querySelector('.add-button');
const addExampleButton = document.querySelector('.add-example-button');
const addBookButton = document.querySelector('.add-book-button');
const closeButton = document.querySelector('.close-button');

const inputTitle = document.querySelector('#inputTitle');
const inputAuthor = document.querySelector('#inputAuthor');
const inputPages = document.querySelector('#inputPages');
const readNo = document.querySelector('#readNo');
const readYes = document.querySelector('#readYes');

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
addBookButton.addEventListener('click',getValues)
