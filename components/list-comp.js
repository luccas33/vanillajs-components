import { appData } from "../app-data.js";
import { appEvents } from "../app-events.js";
import { applyCSS } from "../util/applycss.js";

export function createListComponent() {
    let component = {};
    component.mainElement = document.createElement('div');
    component.mainElement.className = 'list-comp';
    component.init = () => init(component);
    return component;
}

function init(component) {
    let title = document.createElement('h4');
    title.textContent = 'List Component';
    component.mainElement.append(title);
    component.listElement = document.createElement('div');
    component.mainElement.append(component.listElement);

    component.items = [];

    // Adicionando evento para ser chamado em exec()
    appEvents.add(appEvents.keys.listInfoChange, () => {
        component.items.forEach(item => item.isRemoved = false);
        createList(component);
    });
    appEvents.add(appEvents.keys.refreshList, () => createList(component));
}

function createList(component) {
    component.listElement.innerHTML = '';

    let quantity = appData.listInfo.quantity || 0;
    if (quantity < 1) {
        return;
    }

    for (let i = 0; i < quantity; i++) {
        createListItem(component, i);
    }
    component.items = component.items.slice(0, quantity);

    component.totalElement = document.createElement('div');
    component.listElement.append(component.totalElement);
    sumValues(component);
}

function createListItem(component, index) {
    let item = component.items[index];
    if (item && item.isRemoved) {
        return;
    }
    if (!item) {
        item = { value: index + 1, index }
        component.items.push(item);
    }

    let main = component.listElement;
    let itemdiv = document.createElement('div');
    main.append(itemdiv);

    let name = appData.listInfo.name || 'Value';
    let label = document.createElement('label');
    label.textContent = `${name} ${index + 1}`;
    itemdiv.append(label);

    let input = document.createElement('input');
    input.value = item.value;
    input.type = 'number';
    itemdiv.append(input);
    applyCSS(input, css.input);

    input.addEventListener('change', () => {
        item.value = Number.parseFloat(input.value);
        sumValues(component);
    });

    let btn = document.createElement('button');
    btn.textContent = 'X';
    itemdiv.append(btn);
    btn.addEventListener('click', () => {
        item.isRemoved = true;
        item.value = item.index + 1;
        appEvents.exec(appEvents.keys.refreshList);
    });
}

function sumValues(component) {
    let total = 0;
    component.items.filter(item => !item.isRemoved)
        .forEach(item => {
            total += item.value;
        });
    let ptotal = document.createElement('p');
    ptotal.textContent = `Total: ${total}`;
    component.totalElement.innerHTML = '';
    component.totalElement.append(ptotal);
}

const css = {
    input: {
        width: '80px',
        marginLeft: '6px'
    }
}
