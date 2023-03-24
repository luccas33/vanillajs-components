import { appData } from "../app-data.js";
import { appEvents } from "../app-events.js";
import { addnewel, newel, onchange } from "./comp-utils.js";

export function createFormComponent() {
    let component = {};
    component.mainElement = newel("div", { className: "form-comp" });
    component.init = () => init(component);
    return component;
}

function init(component) {
    let main = component.mainElement;

    addnewel(main, "h4", { textContent: "Form Component" });
    addnewel(main, "p", {
        innerText: "Informe um nome e uma quantidade para gerar a lista",
    });

    let inputs = [
        { label: "Nome", name: "name", type: "text" },
        { label: "Quantidade", name: "quantity", type: "number" },
    ];

    inputs.forEach((ipt) => {
        let iptDiv = addnewel(main, "div", {
            className: "form-input-" + ipt.name,
            style: css.field,
        });

        addnewel(iptDiv, "label", {
            innerText: ipt.label,
            style: css.fieldElement,
        });

        let input = addnewel(iptDiv, "input", {
            type: ipt.type,
            style: css.fieldElement,
        });
        onchange(input, () => {
            let value = input.value;
            if (ipt.type == "number") {
                value = Number.parseInt(value);
            }
            appData.listInfo[ipt.name] = value;

            // Chamando evento adicionado em add()
            appEvents.exec(appEvents.keys.listInfoChange);
        });
    });
}

const css = {
    field: {
        display: "flex",
    },
    fieldElement: {
        width: "80px",
        display: "flex",
    },
};
