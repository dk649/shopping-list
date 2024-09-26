const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("please add an item");
    return;
  }

  console.log(newItem);

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);
  itemList.appendChild(li);

  itemInput.value = "";
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

// Events listeners

itemForm.addEventListener("submit", addItem);
