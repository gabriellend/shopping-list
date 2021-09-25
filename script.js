// INITIALIZE POPOVER
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

// ELEMENT SELECTORS
var button = document.querySelector('#add');
var input = document.querySelector('#userinput');
var ul = document.querySelector('ul');
var liElements = document.querySelectorAll('li');
var addItemDiv = document.querySelector('.input-group');
var body = document.querySelector('body');

// HELPER FUNCTIONS
function toggleDone(event) {
	event.srcElement.classList.toggle('done');
};

function inputLength() {
	return input.value.length;
}

function deleteListItem(event) {
	if (ul.children.length === 1) {
		event.srcElement.parentNode.remove();
		var clearButton = document.querySelector('#clear');
		clearButton.remove();
	} else {
		event.srcElement.parentNode.remove();
	}
}

function showDeleteButton(event) {
	if (event.target.tagName === 'LI') {
		event.srcElement.nextSibling.classList.add('show');
	} else {
		event.target.lastChild.classList.add('show');
	}
}

function hideDeleteButton(event) {
	if (event.target.tagName === 'LI') {
		event.srcElement.nextSibling.classList.remove('show');
	} else {
		event.target.lastChild.classList.remove('show');
	}
}

function addDivAndButton(li) {
	var itemDiv = document.createElement('div');
	itemDiv.classList.add('itemdiv', 'width', 'margin');
	itemDiv.addEventListener('mouseover', showDeleteButton);
	itemDiv.addEventListener('mouseleave', hideDeleteButton);

	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'x';
	deleteButton.addEventListener('click', deleteListItem);
	deleteButton.classList.add('btn', 'btn-outline-secondary', 'bg-light', 'deletebutton');

	itemDiv.append(li, deleteButton);
	ul.append(itemDiv);
}

function saveItem(event) {
	let inputValue = event.target.value;
	if (event.target.value.length > 0 && (event.keyCode === 13 || event.type === 'click')) {
		let li = document.createElement('li');
		li.addEventListener('click', toggleDone);
		li.addEventListener('dblclick', editItem);
		li.textContent = event.target.value;
		event.target.parentNode.prepend(li);
		event.target.remove();
	 } else if (event.target.value.length === 0 && (event.keyCode === 13 || event.type === 'click')) {
		var li = document.createElement('li');
		li.addEventListener('click', toggleDone);
		li.addEventListener('dblclick', editItem);
		li.textContent = initialValue;
		event.target.parentNode.prepend(li);
		event.target.remove();
	}
}

// TO SAVE VALUE OF ITEM BEFORE IT IS EDITED
let initialValue;

function editItem(event) {
	let item = event.target.innerHTML;
	let itemInput = document.createElement('input');
	itemInput.type = 'text';
	itemInput.value = item;
	itemInput.classList.add('edit');
	itemInput.addEventListener('keypress', saveItem);
	itemInput.addEventListener('click', saveItem);
	event.target.parentNode.prepend(itemInput);
	event.target.remove();
	itemInput.select();
}

function createListItem() {
	let li = document.createElement('li');
	li.addEventListener('click', toggleDone);
	li.addEventListener('dblclick', editItem);
	li.textContent = input.value;

	addDivAndButton(li);

	input.value = '';
}

function addListItemOnClick() {
	if (inputLength() > 0 && ul.children.length === 0) {
		createListItem();
		addClearButton();
	} else if (inputLength() > 0) {
		createListItem();
	}
}

function clearList(event) {
	ul.innerHTML = '';
	event.target.remove();
}

function addClearButton() {
	var clearButton = document.createElement('button');
	clearButton.innerHTML = 'Clear';
	clearButton.addEventListener('click', clearList);
	clearButton.classList.add('btn', 'btn-outline-secondary', 'bg-light');
	clearButton.setAttribute('id', 'clear');
	addItemDiv.append(clearButton);
}

function addListItemOnEnter(event) {
	if (inputLength() > 0 && event.keyCode === 13 && ul.children.length === 0) {
		createListItem();
		addClearButton();
	} else if (inputLength() > 0 && event.keyCode === 13) {
		createListItem();
	}
}

function hidePopover(event) {
	if (event.keyCode === 13 || event.type === 'click') {
		popoverList[0].dispose();
	}
}

// EVENT LISTENERS
button.addEventListener('click', addListItemOnClick);
button.addEventListener('click', hidePopover);

input.addEventListener('keypress', addListItemOnEnter);
input.addEventListener('keypress', hidePopover);



