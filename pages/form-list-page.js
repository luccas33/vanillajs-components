import { addnewel } from "../components/comp-utils.js";
import { createFormComponent } from "../components/form-comp.js";
import { createListComponent } from "../components/list-comp.js";
import { createHeaderComponent } from "./shared/header-comp.js";

export function createFormListPage() {
    let component = {};
    component.mainElement = document.createElement('section');
    component.mainElement.className = 'form-list-page';
    component.init = () => init(component);
    return component;
}

function init(component) {
    let header = createHeaderComponent();
    header.init();
    component.mainElement.append(header.mainElement);

    let content = addnewel(component.mainElement, 'main', {className: 'page-content'});
    component.content = content;

    addnewel(content, 'h2', {textContent: 'Form List Page'})

    let form = createFormComponent();
    form.init();
    component.content.append(form.mainElement);

    let list = createListComponent();
    list.init();
    component.content.append(list.mainElement);

    addnewel(content, 'p', {textContent: 'Acesso o arquivo components/list-comp.js para ver o código deste componente'})
}
