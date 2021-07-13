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

const container = document.querySelector(".container");
const inputField = document.querySelector(".inputField");

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

function createInputFields () {
	titleField = document.createElement('input')
	titleField.id = 'inputTitle'
	titleFieldLable = document.createElement('label')
	titleFieldLable.for = 'inputTitle'
	titleFieldLable.textContent = "Title"
	inputField.appendChild(titleFieldLable)
	inputField.appendChild(titleField)

	submitButton = document.createElement('button')
	submitButton.textContent = "Click to add the book"
	submitButton.addEventListener('click', getValues)
	inputField.appendChild(submitButton)
}

function getValues() {
	newBook = new Book()
	newBook.title = document.querySelector('#inputTitle').value
	console.log(newBook.title)
	addBookToLibrary(newBook)
}

function logconsole(e) {
	console.log(e)
}

// addBookToLibrary()

const addButton = document.querySelector('#addBook')
addButton.addEventListener('click', createInputFields)