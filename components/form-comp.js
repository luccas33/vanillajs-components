import { appData } from "../app-data.js";
import { appEvents } from "../app-events.js";
import { applyCSS } from "../util/applycss.js";

export function createFormComponent() {
    let component = {};
    component.mainElement = document.createElement('div');
    component.mainElement.className = 'form-comp';
    component.init = () => init(component);
    return component;
}

function init(component) {
    let title = document.createElement('h4');
    title.textContent = 'Form Component';
    component.mainElement.append(title);

    let p = document.createElement('p');
    p.innerText = 'Informe um nome e uma quantidade para gerar a lista';
    component.mainElement.append(p);

    let inputs = [
        {label: 'Nome', name: 'name', type: 'text'}, 
        {label: 'Quantidade', name: 'quantity', type: 'number'}
    ];
    inputs.forEach(ipt => {
        let iptDiv = document.createElement('div');
        iptDiv.className = 'form-input-' + ipt.name;
        component.mainElement.append(iptDiv);
        applyCSS(iptDiv, css.field);

        let label = document.createElement('label');
        label.innerText = ipt.label;
        iptDiv.append(label);
        applyCSS(label, css.fieldElement);

        let input = document.createElement('input');
        input.type = ipt.type;
        iptDiv.append(input);
        applyCSS(input, css.fieldElement);

        input.addEventListener('change', () => {
            let value = input.value;
            if (ipt.type == 'number') {
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
        display: 'flex'
    },
    fieldElement: {
        width: '80px',
        display: 'flex'
    }
}
