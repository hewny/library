let myLibrary = [];

function Book() {
	this.title = '';
	this.author = '';
	this.pages = '';
	this.read = null;
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages`
	}
}

Book.prototype.toggleRead = function() {
	if (this.read === true) {
		this.read = false
		updateBooks()
	}
	else if (this.read === false) {
		this.read = true
		updateBooks()
	}
}

function addBookToLibrary(i) {
	myLibrary.push(i)
	clearInput()
	hideModal()
	updateBooks()
}

function addExampleBook() {
	let exampleBook = new Book()
	exampleBook.title = "Example Title"
	exampleBook.author = "Example Author"
	exampleBook.pages = Math.floor(Math.random()*100)
	exampleBook.read = false
	exampleBook.bookValue = myLibrary.length
	addBookToLibrary(exampleBook)
}

function removeBook(i) {
	myLibrary.splice(i,1)
	updateBooks()
}

function updateBooks() {
	// clear previous entries
	cardContainer.querySelectorAll('.card').forEach(div => div.remove())
	
	// reload books
	for (let i=0; i < myLibrary.length; i++) {
		newDiv = document.createElement('div');
		newDiv.className = "card";
		newCloseButton = document.createElement('button');
		newCloseButton.classList.add('card-delete-button');
		newCloseButton.textContent = "X";
		newCloseButton.addEventListener('click', function() {
			removeBook(i)
		}, false);
		newReadButton = document.createElement('button');
		newReadButton.classList.add('card-read-toggle');
		newReadButton.textContent = "Toggle Read";
		newReadButton.addEventListener('click', function() {
			myLibrary[i].toggleRead()
		}, false);
		newImg = document.createElement('img');
		newImg.src="book.png"
		newH1 = document.createElement('h1');
		newH1.textContent = myLibrary[i]["title"];
		newH2 = document.createElement('h2');
		newH2.textContent = myLibrary[i]["author"];
		newH3 = document.createElement('h3');
		newH3.textContent = myLibrary[i]["pages"]+" pages";

		if (myLibrary[i].read === true && myLibrary[i].read != null) {
			newDiv.classList.add('card-read')
		}
		
		newDiv.appendChild(newCloseButton);
		newDiv.appendChild(newReadButton);
		newDiv.appendChild(newImg);
		newDiv.appendChild(newH1);
		newDiv.appendChild(newH2);
		newDiv.appendChild(newH3);
		cardContainer.appendChild(newDiv);
	}
}

function getValues() {
	let newBook = new Book()
	newBook.title = inputTitle.value
	newBook.author = inputAuthor.value
	newBook.pages = inputPages.value
	newBook.read = evalRead()
	addBookToLibrary(newBook)
}

function evalRead() {
	if (readNo.checked === false && readYes.checked === false) {
		return false
	}
	if (readNo.checked) {
		return false
	}
	else return true
}

function evalModal() {
	clearErrors()
	if (inputTitle.value === "") {
		modalContentError.textContent = "Title is required";
		inputTitle.classList.add('red-border')
	}
	else if (inputAuthor.value === "") {
		modalContentError.textContent = "Author is required";
		inputAuthor.classList.add('red-border')
	}
	else if (inputPages.value === "") {
		modalContentError.textContent = "Pages are required";
		inputPages.classList.add('red-border')
	}
	else if (inputPages.value > 9999) {
		modalContentError.textContent = "Pages cannot be greater than 9999";
		inputPages.classList.add('red-border')
	}
	else if (readNo.checked === false && readYes.checked === false) {
		modalContentError.textContent = "You must select Yes or No to the question";
		modalContentRead.classList.add('red-border')
	}
	else {
		getValues()
	}
}

function clearErrors() {
	allInputs = document.querySelectorAll('input')
	allInputs.forEach(item => {
		if (item.classList.contains('red-border')) {
			item.classList.remove('red-border')
		}
	})
	if (modalContentRead.classList.contains('red-border')) {
		modalContentRead.classList.remove('red-border')
	}
	modalContentError.textContent = ""
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
const modalContentError = document.querySelector('.modal-content-error')
const modalContentRead = document.querySelector('.modal-content-read')
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
addBookButton.addEventListener('click',evalModal)
addExampleButton.addEventListener('click',addExampleBook)