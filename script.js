const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");
let isEditMode = false;

const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

document.addEventListener("DOMContentLoaded", (event) => {
  displayItemsInStorage();
  getItemFromStorage();
  checkUI();
});

function onAddItemSubmit(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("please add an item");
    return;
  }

  // this is where it came from
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  }

  // console.log(newItem);

  const result = checkIfItemExists(newItem);
  if (result) {
    alert("item already exists");
    itemInput.value = "";
  } else {
    addItemToDOM(newItem);
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = "";
  }
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.classList.add("edit");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  // console.log(itemsFromStorage);
  // add item to array
  itemsFromStorage.push(item);

  // convert to JSON string and set to local storage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const Icon = createIcon("fa-solid fa-xmark");

  button.appendChild(Icon);
  return button;
}

function createIcon(classes) {
  const Icon = document.createElement("i");
  Icon.className = classes;
  return Icon;
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    removeItem(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  if (itemsFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#ff6666";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  // console.log(item);
  if (confirm("Are you sure you want to delete item")) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  // console.log(itemsFromStorage);

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function removeAll(event) {
  // console.log(itemList.firstChild);
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  if (confirm("Are you sure you want to remove all items")) {
    localStorage.removeItem("items");
  } else {
    return;
  }
  checkUI();
}

function filterItems(event) {
  const items = itemList.querySelectorAll("li");
  const result = event.target.value.toLowerCase();
  // console.log(result);
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(result) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearAll.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearAll.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

function getItemFromStorage() {
  let itemsInStorage;

  if (localStorage.getItem("items") === null) {
    itemsInStorage = [];
  } else {
    itemsInStorage = JSON.parse(localStorage.getItem("items"));
    // console.log(itemsInStorage);
  }

  return itemsInStorage;
}

function displayItemsInStorage() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
}
// Events listeners

itemForm.addEventListener("submit", onAddItemSubmit);

itemList.addEventListener("click", onClickItem);

clearAll.addEventListener("click", removeAll);

itemFilter.addEventListener("input", filterItems);

checkUI();
