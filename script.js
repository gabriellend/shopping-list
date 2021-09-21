// ELEMENT SELECTORS
var button = document.querySelector('#add');
var input = document.querySelector('#userinput');
var ul = document.querySelector('ul');
var liElements = document.querySelectorAll('li');

// INITIALIZE LI ELEMENTS WITH EVENT LISTENERS AND BUTTONS
liElements.forEach(function(li) {
	addLiEventListener(li);
	addDivAndButton(li);
});


// HELPER FUNCTIONS
function addLiEventListener(li) {
	li.addEventListener('click', toggleDone);
}

function toggleDone(event) {
	event.srcElement.classList.toggle('done');
};

function inputLength() {
	return input.value.length;
}

function deleteListItem(event) {
	event.srcElement.parentNode.remove();
}

function addDivAndButton(li) {
	var itemDiv = document.createElement('div');
	itemDiv.classList.add('itemdiv', 'width', 'margin');

	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Delete';
	deleteButton.addEventListener('click', deleteListItem);

	
	itemDiv.append(li, deleteButton);
	ul.append(itemDiv);
}

function createListItem() {
	var li = document.createElement('li');
	li.addEventListener('click', toggleDone);
	li.textContent = input.value;

	addDivAndButton(li);

	input.value = '';
}

function addListItemOnClick() {
	if (inputLength() > 0) {
		createListItem();
	}
}

function addListItemOnEnter(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListItem();
	}
}

// EVENT LISTENERS
button.addEventListener('click', addListItemOnClick);
input.addEventListener('keypress', addListItemOnEnter);


