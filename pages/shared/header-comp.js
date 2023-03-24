import { addnewel, applyCSS, newel, onclick } from "../../components/comp-utils.js";
import { appRoot } from "../../main.js";

export function createHeaderComponent() {
    let component = {};
    component.mainElement = newel('header', {className: 'header'});
    component.init = () => init(component);
    return component;
}

function init(component) {
    createTitle(component);
    createNavigation(component);
    applyCSS(component.mainElement, css.main);
}

function createTitle(component) {
    let titleDiv = addnewel(component.mainElement, 'div', {className: 'header-title', style: css.title});
    addnewel(titleDiv, 'h2', {textContent: 'Header'});
}

function createNavigation(component) {
    let nav = addnewel(component.mainElement, 'nav', {className: 'header-nav', style: css.nav});

    appRoot.pages.forEach(pg => {
        let a = addnewel(nav, 'a', {innerText: pg.label, style: css.navItem});
        onclick(a, () => appRoot.navToPage(pg.path));
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
