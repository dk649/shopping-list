const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");

const itemFilter = document.getElementById("filter");

document.addEventListener("DOMContentLoaded", (event) => {
  // console.log("DOM fully loaded and parsed");
  checkUI();
});

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("please add an item");
    return;
  }

  // console.log(newItem);

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();

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

function removeItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this Item")) {
      event.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function removeAll(event) {
  // console.log(itemList.firstChild);
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function filterItems(event) {
  const items = itemList.querySelectorAll("li");
  const result = event.target.value.toLowerCase();
  console.log(result);
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
}

// Events listeners

itemForm.addEventListener("submit", addItem);

itemList.addEventListener("click", removeItem);

clearAll.addEventListener("click", removeAll);

itemFilter.addEventListener("input", filterItems);

checkUI();
