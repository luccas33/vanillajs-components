import { addnewel, newel } from "../components/comp-utils.js";
import { createHeaderComponent } from "./shared/header-comp.js";

type HomePage = {
    mainElement: HTMLElement,
    init: Function
}

/*
    Função que cria o componente.
    A função não é um componente, pois não pode renderiza-lo.
    A função deve apenas criar o componente e retorna-lo.
*/
export function createHomePage(): HomePage {
    // O componente é um objeto
    let component = {} as any;

    /*
        O componente deve ter um elemento principal, no qual todo o conteudo é renderizado.

        Não gere os elementos filhos do mainElement aqui.
        Todos os elementos devem ser gerados ao executar init()
    */
    component.mainElement = newel('section', {className: 'home-page'});

    /*
        O componente deve ter uma função para disparar a renderização.
        Esta função deve receber o componente no parâmetro internamente.

        Não execute init() nem coloque mainElement na tela diretamente.
        init() é executado pelo componente pai em seu próprio init(), ou pelo main.js, caso seja uma página.
        mainElement é adicionado ao mainElement do componente pai, ou no body, caso seja uma página.
    */
    component.init = () => init(component);

    return component;
}

function init(component: HomePage) {
    // Criando o componente Header
    let header = createHeaderComponent();
    // Iniciando o componente Header
    header.init();
    // Adicionando o mainElement do Header ao mainElement da Home
    component.mainElement.append(header.mainElement);

    let content = addnewel(component.mainElement, 'main', {className: 'page-content'});

    addnewel(content, 'h2', {textContent: 'Home Page'});

    addnewel(content, 'p', {textContent: 'Acesse o arquivo /pages/home-page.js para ler o tutorial.'});

    addnewel(content, 'p', {innerText: 'Clique em Form List para ver manipulação complexa de lista.'});
}
