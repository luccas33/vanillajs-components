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

    // Adicionando evento para ser chamado em exec()
    appEvents.add(appEvents.keys.listInfoChange, () => createList(component));
}

function createList(component) {
    let main = component.listElement;
    main.innerHTML = '';
    
    let name = appData.listInfo.name || 'Value';
    let quantity = appData.listInfo.quantity || 0;
    component.inputs = [];

    for (let i = 1; i <= quantity; i++) {
        let item = document.createElement('div');
        main.append(item);

        let label = document.createElement('label');
        label.textContent = `${name} ${i}`;
        item.append(label);

        let input = document.createElement('input');
        input.value = i;
        input.type = 'number';
        item.append(input);
        component.inputs.push(input);
        applyCSS(input, css.input);

        input.addEventListener('change', () => sumValues(component));
    }

    component.totalElement = document.createElement('div');
    main.append(component.totalElement);
    sumValues(component);
}

function sumValues(component) {
    let total = 0;
    component.inputs.forEach(ipt => {
        total += Number.parseFloat(ipt.value);
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
