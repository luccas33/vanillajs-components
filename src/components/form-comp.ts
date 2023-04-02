import { appData } from "../app-data.js";
import { appEvents } from "../app-events.js";
import { addnewel, newel, onchange } from "./comp-utils.js";

type FormComponent = {
    mainElement: HTMLElement,
    init: Function
}

export function createFormComponent(): FormComponent {
    let component = {} as any;
    component.mainElement = newel("div", { className: "form-comp" });
    component.init = () => init(component);
    return component;
}

function init(component: FormComponent) {
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
        }) as HTMLInputElement;
        onchange(input, () => {
            if (ipt.type === 'text') {
                appData.listInfo.name = input.value;
            }
            if (ipt.type === 'number') {
                appData.listInfo.quantity = Number.parseInt(input.value);
            }

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
