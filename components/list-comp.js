import { appData } from "../app-data.js";
import { appEvents } from "../app-events.js";
import { addnewel, newel, onchange, onclick } from "./comp-utils.js";

export function createListComponent() {
    let component = {};
    component.mainElement = newel("div", { className: "list-comp" });
    component.init = () => init(component);
    return component;
}

function init(component) {
    let main = component.mainElement;

    addnewel(main, "h4", { textContent: "List Component" });

    component.listElement = addnewel(main, "div");
    component.items = [];

    // Adicionando evento para ser chamado em exec()
    appEvents.add(appEvents.keys.listInfoChange, () => {
        component.items.forEach((item) => (item.isRemoved = false));
        createList(component);
    });
    appEvents.add(appEvents.keys.refreshList, () => createList(component));
}

function createList(component) {
    component.listElement.innerHTML = "";

    let quantity = appData.listInfo.quantity || 0;
    if (quantity < 1) {
        return;
    }

    for (let i = 0; i < quantity; i++) {
        createListItem(component, i);
    }
    component.items = component.items.slice(0, quantity);

    component.totalElement = addnewel(component.listElement, "div");
    sumValues(component);
}

function createListItem(component, index) {
    let item = component.items[index];
    if (item && item.isRemoved) {
        return;
    }
    if (!item) {
        item = { value: index + 1, index };
        component.items.push(item);
    }

    let main = component.listElement;
    let itemdiv = addnewel(main, "div");

    let name = appData.listInfo.name || "Value";
    addnewel(itemdiv, "label", { textContent: `${name} ${index + 1}` });

    let input = addnewel(itemdiv, "input", {
        value: item.value,
        type: "number",
        style: css.input,
    });

    onchange(input, () => {
        item.value = Number.parseFloat(input.value);
        sumValues(component);
    });

    let btn = addnewel(itemdiv, "button", { textContent: "X" });
    onclick(btn, () => {
        item.isRemoved = true;
        item.value = item.index + 1;
        appEvents.exec(appEvents.keys.refreshList);
    });
}

function sumValues(component) {
    let total = 0;
    component.items
        .filter((item) => !item.isRemoved)
        .forEach((item) => {
            total += item.value;
        });
    component.totalElement.innerHTML = "";
    addnewel(component.totalElement, "p", { textContent: `Total: ${total}` });
}

const css = {
    input: {
        width: "80px",
        marginLeft: "6px",
    },
};
