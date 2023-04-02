import { addnewel, applyCSS, newel, onclick } from "../../components/comp-utils.js";
import { appRoot } from "../../main.js";

type HeaderComponent = {
    mainElement: HTMLElement,
    init: Function
}

export function createHeaderComponent(): HeaderComponent {
    let component = {} as any;
    component.mainElement = newel('header', {className: 'header'});
    component.init = () => init(component);
    return component;
}

function init(component: HeaderComponent) {
    createTitle(component);
    createNavigation(component);
    applyCSS(component.mainElement, css.main);
}

function createTitle(component: HeaderComponent) {
    let titleDiv = addnewel(component.mainElement, 'div', {className: 'header-title', style: css.title});
    addnewel(titleDiv, 'h2', {textContent: 'Header'});
}

function createNavigation(component: HeaderComponent) {
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
