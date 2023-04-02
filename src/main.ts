import { createHomePage } from "./pages/home-page.js";
import { createFormListPage } from "./pages/form-list-page.js";

/**
 * Relação de componentes de página
 */
const pages = [
    {path: '/home', label: 'Home', createComponent: createHomePage},
    {path: '/form-list', label: 'Form List', createComponent: createFormListPage}
];

function restorePage() {
    let path = window.location.pathname;
    path = path ? path.trim() : '';
    if (path == '' || path == '/') {
        path = sessionStorage.getItem('path') || '';
    }
    navToPage(path);
}

/**
 * Function responsável por acessar os componentes de página
 */
function navToPage(pagePath: string) {
    pagePath = pagePath ? pagePath.trim() : '';
    sessionStorage.setItem('path', pagePath);

    let page = getPageByPath(pagePath);
    page.init();

    document.body.innerHTML = '';
    document.body.append(page.mainElement);
}

function getPageByPath(path: string) {
    let page = pages.find(pg => pg.path == path);
    if (page) {
        return page.createComponent();
    }
    return createHomePage();
}

export let appRoot = {pages, navToPage}

restorePage();
