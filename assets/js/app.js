// Fetching Dom Elements
const form = document.querySelector('#form');
const formInput = document.querySelector('#form input');
const list = document.querySelector('.list-group');
const filter = document.querySelector('.filter');
const totalItem = document.querySelector('.count span');
const emptyList = document.querySelector('.empty-list');

// Empty List Check
const emptyListCheck = () => {
    if (list.children.length) {
        emptyList.style.display = 'none';
    } else {
        emptyList.style.display = 'block';
    }
}

// Set Element
const setElement = (element, displayValue, targetElement, iconClass, btnClass) => {
    element.style.display = displayValue;
    targetElement.innerHTML = `<i class="${iconClass}"></i>`;
    targetElement.className = `btn btn-sm p-0 text-primary ${btnClass}`;
}

// Edit List Item
const editList = (itemLabel, itemDiv, targetElement) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control form-control-sm';
    input.value = itemLabel.innerText;
    itemDiv.insertBefore(input, itemLabel.parentNode);
    setElement(itemLabel.parentNode, 'none', targetElement, 'bi bi-file-earmark-text', 'save');
}

// Save List Item
const saveList = (li, itemLabel, targetElement) => {
    const input = li.querySelector('.form-control');
    if (input.value) {
        itemLabel.innerHTML = `<input type="checkbox" class="form-check-input">${input.value}`;
        input.remove();
        setElement(itemLabel.parentNode, 'block', targetElement, 'bi bi-pencil', 'edit');
    } else {
        input.remove();
        setElement(itemLabel.parentNode, 'block', targetElement, 'bi bi-pencil', 'edit');
    }
}

// Complete List Item
const completeItem = (targetElement) => {
    if (targetElement.checked) {
        targetElement.setAttribute("checked", "");
        targetElement.parentNode.classList.add('line-through');
    } else {
        targetElement.parentNode.classList.remove('line-through');
        targetElement.removeAttribute("checked");
    }
}

// All Filter
const allFilter = () => {
    jQuery("#preloader").show().fadeOut(250);
    [...list.children].forEach((element) => {
        element.style.display = 'block';
    });
}

// Active Filter
const activeFilter = (display1, display2) => {
    jQuery("#preloader").show().fadeOut(250);
    [...list.children].filter((element) => {
        if (element.querySelector('.line-through')) {
            element.style.display = display1;
        } else {
            element.style.display = display2;
        }
    });
}

// Clear Filter
const clearFilter = () => {
    jQuery("#preloader").show().fadeOut(250);
    list.innerHTML = '';
    emptyListCheck();
    totalItem.innerText = list.children.length;
}

// Add list item
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let itemName = formInput.value;
    list.innerHTML += `
    <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <div class="align-self-center item-name">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input">${itemName}
                    </label>
                </div>
            </div>
            <div class="align-self-center item-action">
                <ul class="list-inline">
                    <li class="list-inline-item">
                        <button type="button" class="btn btn-sm p-0 text-primary edit"><i
                                class="bi bi-pencil"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button type="button" class="btn btn-sm p-0 text-danger delete"><i
                                class="bi bi-x-lg"></i></button>
                    </li>
                </ul>
            </div>
        </div>
    </li>
    `
    formInput.value = '';
    totalItem.innerText = list.children.length;
    emptyListCheck();
});

// List Operation
list.addEventListener('click', (e) => {
    const targetElement = e.target;
    const editBtn = targetElement.classList.contains('edit');
    const saveBtn = targetElement.classList.contains('save');
    const deleteBtn = targetElement.classList.contains('delete');
    const check = targetElement.classList.contains('form-check-input');
    const li = targetElement.closest('.list-group-item');
    if (li) {
        const itemDiv = li.querySelector('.item-name');
        const itemLabel = li.querySelector('.item-name .form-check-label');
        if (editBtn) {
            editList(itemLabel, itemDiv, targetElement);
        } else if (deleteBtn) {
            li.remove();
            emptyListCheck();
        } else if (saveBtn) {
            saveList(li, itemLabel, targetElement);
        } else if (check) {
            completeItem(targetElement);
        }
    }
});

// Filter Operation
filter.addEventListener('click', (e) => {
    const targetElement = e.target;
    const all = targetElement.classList.contains('all');
    const active = targetElement.classList.contains('alive');
    const completed = targetElement.classList.contains('completed');
    const clear = targetElement.classList.contains('clear');
    if (all) {
        allFilter();
    } else if (active) {
        activeFilter('none', 'block');
    } else if (completed) {
        activeFilter('block', 'none');
    } else if (clear) {
        clearFilter();
    }
});

totalItem.innerText = list.children.length;
emptyListCheck();