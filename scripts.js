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

class Book {
	constructor(title,author,pages,read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.pages = read;
	}

	toggleRead(){
		if (this.read === true) {
			this.read = false
			updateBooks()
		}
		else if (this.read === false) {
			this.read = true
			updateBooks()
		}
	}
}

class Library {
	constructor() {
		this.books = []
	}

	addBookToLibrary(book) {
		this.books.push(book);
		clearInput();
		hideModal();
		updateBooks();
	}

	removeBook(index) {
		this.books.splice(index,1);
		updateBooks();
	}

	addExampleBook = () => {
		let exampleBook = new Book()
		exampleBook.title = randomTitle()
		exampleBook.author = randomAuthor()
		exampleBook.pages = Math.floor(Math.random()*200)
		exampleBook.read = false
		exampleBook.bookValue = myLibrary.length
		this.books.push(exampleBook)
	}
}

var myLibrary = new Library()

addButton.addEventListener('click', showModal)
closeButton.addEventListener('click',hideModal)
addBookButton.addEventListener('click',evalModal)
addExampleButton.addEventListener('click',myLibrary.addExampleBook)

function updateLocalStorage () {
	if (myLibrary.length === 0) {
		localStorage.removeItem("myStoredLibrary")
	} else {
		localStorage.setItem("myStoredLibrary", JSON.stringify(myLibrary))
	}
}

function updateBooks() {
	// clear previous entries
	cardContainer.querySelectorAll('.card').forEach(div => div.remove());

	// update localStorage
	updateLocalStorage();
	
	// reload books
	if (myLibrary.books.length !== 0) {
		for (let i=0; i < myLibrary.books.length; i++) {
			let newDiv = document.createElement('div');
			newDiv.className = "card";
			let newCloseButton = document.createElement('button');
			newCloseButton.classList.add('card-delete-button');
			newCloseButton.textContent = "X";
			newCloseButton.addEventListener('click', function() {
				myLibrary.removeBook(i)
			}, false);
			let newReadButton = document.createElement('button');
			newReadButton.classList.add('card-read-toggle');
			newReadButton.textContent = "Toggle Read";
			newReadButton.addEventListener('click', function() {
				myLibrary.books[i].toggleRead()
			}, false);
			let newImg = document.createElement('img');
			newImg.src="book.png"
			let newH1 = document.createElement('h1');
			newH1.textContent = myLibrary.books[i]["title"];
			let newH2 = document.createElement('h2');
			newH2.textContent = myLibrary.books[i]["author"];
			let newH3 = document.createElement('h3');
			newH3.textContent = myLibrary.books[i]["pages"]+" pages";
			
			if (myLibrary.books[i].read === true && myLibrary.books[i].read != null) {
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
	} else {
		let newDiv = document.createElement('div');
		newDiv.className = "card";
		let newImg = document.createElement('img');
		newImg.src="plus.png"
		let newH1 = document.createElement('h1');
		newH1.textContent = "Click the button above to add a new book";

		newDiv.appendChild(newImg)
		newDiv.appendChild(newH1)
		cardContainer.appendChild(newDiv)
	}
}

function getValues() {
	let newBook = new Book()
	newBook.title = inputTitle.value
	newBook.author = inputAuthor.value
	newBook.pages = inputPages.value
	newBook.read = evalRead()
	myLibrary.addBookToLibrary(newBook)
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

function storageAvailable(type) {
	var storage;
	if (localStorage.length !== 0) {
		try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				(storage && storage.length !== 0);
		}
	}
}

function restoreMyLibrary(recalledLibrary) {
	recalledLibrary.books.forEach(book => {
		let newBook = new Book()
		newBook.title = book.title
		newBook.author = book.author
		newBook.pages = book.pages
		newBook.read = book.read
		myLibrary.addBookToLibrary(newBook)
	})
}

if (storageAvailable('localStorage')) {
	let recalledLibrary = JSON.parse(localStorage.getItem("myStoredLibrary"));
	restoreMyLibrary(recalledLibrary)
	updateBooks();
  }
  else {
	myLibrary = [];
  }

  let titleList = [
	"The Book of Common Law",
	"Carnivorous Gardening",
	"The Book of Twelve Seasons",
	"A Journey Beyond the Veil",
	"Raising Weasels With Confidence",
	"A Short History of Dwarves",
	"What Color Is Your Dragon?",
	"Samwell’s Guide to Arms and Armor",
	"The Silent Bard and Other Myths",
	"The Letters of Saint Cuthbert",
	"Secret Doors and Passages (bad poetry collection)",
	"A Journeyman’s Guide to Barrel Making",
	"Basic Carpentry For Complex Dungeons",
	"The Great Extraplanar Hoax",
	"Fungal Crop Rotation For Underground Dwellers",
	"How To Use a Sundial In the Rain",
	"Farming Wheat, Barley, and Giant Frogs",
	"A Caretaker’s Guide to Giant Centipedes",
	"101 Untraceable Poisons",
	"All Giants Great and Small",
	"50 Things To Do With a Dead Lich",
	"Beauty Is In the Eyes of the Beholder",
	"Planning Your Castle Construction",
	"Tavern Management In Rural Areas",
	"Accidental Pickpocketing and Other Excuses",
	"Spells We Are Still Trying To Make Work",
	"Samwell’s Guide To Wands",
	"The Legend of Tucker’s Kobolds",
	"Potatoes That Resemble Goblins: A Pictorial",
	"Vines: Small, Medium, Giant",
	"Defeating a Heavy Iron Gate",
	"Counting to Ten for Orcs",
	"The Arrow of Benevolent Intent",
	"Monstrous Philosophies",
	"Thirty Ways To Skin a Dragon",
	"Warlock vs Sorcerer: How To Spot the Difference",
	"Tower Defenses, What Works and What Does Not",
	"Samwell’s Guide To Holy Symbols",
	"Prayers For the Righteous",
	"Identifying Grubs, Worms, and Sentient Fungi",
	"Wyverns, Wyrms, Drakes & Dragons: The Differences",
	"Recipes For Disaster: A Cookbook",
	"A Field Guide To Fey",
	"1001 Things To Do Underground",
	"A History of Thieve Guilds",
	"Weather Manipulation and Farm Management",
	"The Whole Hollow World Atlas",
	"The Great Bird Hoax",
	"What’s Behind That Door? A Listener’s Handbook",
	"Turnips. The Gods’ Own Gift To the World",
	"How To Make a Lantern Out Of a Skull",
	"Candlemaking for Clerics",
	"Surveillance Techniques That Don’t Work",
	"The Myth of the Useful Bard",
	"Samwell’s Guide To Useless Glyphs",
	"Thieves Cant… or Can They?",
	"Hunting Mushrooms In the Dark",
	"Cursed Idols and Relics of the Desert",
	"Climate Change During the Dark Wizard Times",
	"Airships. An Inflatable History",
	"How To Live Forever—or Close To It",
	"Giant Flowers. Friend or Foe?",
	"The Most Grand Illusion",
	"Daily Affirmations for Tyrants",
	"Hidden Staircases and Secret Doors",
	"Managing Your Giant Vines",
	"How To Get Way With Murder",
	"Poisoned Pens. Allegory or Literal Danger?",
	"Sonnets for Sorcerers",
	"Seven Knights For Seven Dragons",
	"River Navigation Through Magical Forests",
	"A Biological Survey of Gnomish “People”",
	"Mysterious Structures That Glow",
	"Samwell’s Guide To Blue-Colored Potions",
	"The Unlikely Romance of Owls and Bears",
	"Rocks That Sort of Look Like Orcs",
	"Animal Husbandry and Midwifery",
	"Castle Gardens For Long Sieges",
	"How Green Is My Goblin?",
	"How To Tell a Brew Is True",
	"Cubicles & Commuters: A Fantasy Roleplaying Guide",
	"Explosive Grass and Other Lawn Care Tips",
	"Is Your Spouse a Polymorph? 50 Signs They Might Be",
	"Plots, Intrigue, and Politics",
	"The Book of Uncommon Law",
	"A Simple Guide To Vampires",
	"Unwrapping the Mystery of Mummies",
	"Ghost Stories Written By Ghosts",
	"Samwell’s Guide To Love and Love Potions",
	"The Underground Horoscope",
	"Orienteering Without a Compass",
	"How To Work a Sextant",
	"Fabled Treasures and Monsters",
	"Puppetry For Evil and Parties",
	]
	
let authorList = [
"William Shakespeare",
"Emily Dickinson",
"H. P. Lovecraft",
"Arthur Conan Doyle",
"Leo Tolstoy",
"Edgar Allan Poe",
"Robert Ervin Howard",
"Rabindranath Tagore",
"Rudyard Kipling",
"Seneca",
"John Donne",
"Sarah Williams",
"Oscar Wilde",
"Catullus",
"Alfred Tennyson",
"William Blake",
"Charles Dickens",
"John Keats",
"Theodor Herzl",
"Percy Bysshe Shelley",
"Ernest Hemingway",
"Barack Obama",
"Anton Chekhov",
"Henry Wadsworth Longfellow",
"Arthur Schopenhauer",
"Jacob De Haas",
"George Gordon Byron",
"Jack London",
"Robert Frost",
"Abraham Lincoln",
"O. Henry",
"Ovid",
"Robert Louis Stevenson",
"John Masefield",
"James Joyce",
"Clark Ashton Smith",
"Aristotle",
"William Wordsworth",
"Jane Austen",
"Niccolò Machiavelli",
"Lewis Carroll",
"Robert Burns",
"Edgar Rice Burroughs",
"Plato",
"John Milton",
"Ralph Waldo Emerson",
"Margaret Thatcher",
"Sylvie d'Avigdor",
"Marcus Tullius Cicero",
"Banjo Paterson",
"Woodrow Wilson",
"Walt Whitman",
"Theodore Roosevelt",
"Agatha Christie",
"Ambrose Bierce",
"Nikola Tesla",
"Franz Kafka",
]

const randomTitle = function() {
	return titleList[Math.floor(Math.random() * titleList.length)]
}

const randomAuthor = function() {
	return authorList[Math.floor(Math.random() * authorList.length)]
}