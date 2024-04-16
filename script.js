
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
});


function addItem() {
    var itemInput = document.getElementById('itemInput');
    var itemName = itemInput.value.trim();

    if (itemName !== '') {
        var itemList = document.getElementById('itemList');
        var li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" onchange="toggleItem(this)"> ${itemName} <button onclick="deleteItem(this)">Smazat</button>`;
        itemList.appendChild(li);

        saveItem(itemName);
        itemInput.value = ''; 
    }
}


function saveItem(item) {
    var items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
    var items = JSON.parse(localStorage.getItem('items')) || [];

    var itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach(function(item) {
        var li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" onchange="toggleItem(this)"> ${item} <button onclick="deleteItem(this)">Smazat</button>`;
        itemList.appendChild(li);
    });
}


function toggleItem(checkbox) {
    var li = checkbox.parentNode;
    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
}

function deleteItem(button) {
    var li = button.parentNode;
    var itemText = li.textContent.trim();
    var items = JSON.parse(localStorage.getItem('items'));

    var updatedItems = items.filter(function(item) {
        return item !== itemText;
    });

    localStorage.setItem('items', JSON.stringify(updatedItems));
    li.remove();
}
