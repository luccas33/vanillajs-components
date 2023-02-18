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

    let content = document.createElement('main');
    content.className = 'page-content';
    component.mainElement.append(content);
    component.content = content;

    let title = document.createElement('h2');
    title.textContent = 'Form List Page';
    component.content.append(title);

    let form = createFormComponent();
    form.init();
    component.content.append(form.mainElement);

    let list = createListComponent();
    list.init();
    component.content.append(list.mainElement);

    let p = document.createElement('p');
    p.textContent = 'Acesso o arquivo components/list-comp.js para ver o código deste componente';
    component.content.append(p);
}
