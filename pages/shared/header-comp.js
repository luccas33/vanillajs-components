import { appRoot } from "../../main.js";
import { applyCSS } from "../../util/applycss.js";

export function createHeaderComponent() {
    let component = {};
    component.mainElement = document.createElement('header');
    component.mainElement.className = 'header';
    component.init = () => init(component);
    return component;
}

function init(component) {
    createTitle(component);
    createNavigation(component);
    applyCSS(component.mainElement, css.main);
}

function createTitle(component) {
    let titleDiv = document.createElement('div');
    titleDiv.className = 'header-title';
    component.mainElement.append(titleDiv);
    applyCSS(titleDiv, css.title);

    let h2 = document.createElement('h2');
    h2.textContent = 'Header';
    titleDiv.append(h2);
}

function createNavigation(component) {
    let nav = document.createElement('nav');
    nav.className = 'header-nav';
    component.mainElement.append(nav);
    applyCSS(nav, css.nav);

    appRoot.pages.forEach(pg => {
        let a = document.createElement('a');
        nav.append(a);
        a.innerText = pg.label;
        a.addEventListener('click', () => appRoot.navToPage(pg.path));
        applyCSS(a, css.navItem);
    });
}

const css = {
    main: {
        display: 'flex'
    },
    title: {
        width: '220px'
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        width: '50%'
    },
    navItem: {
        display: 'block',
        fontWeight: 'bolder',
        cursor: 'pointer',
        marginLeft: '3px',
        marginRight: '3px',
        textDecoration: 'underline'
    }
}
