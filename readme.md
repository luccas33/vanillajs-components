# VanillaJS Components

### Componentes, navegação, data bind e eventos com JS vanilla de forma mais fácil que Angular/React

Todo o controle de renderização, fluxo e dados do componente na sua mão.
Porém, sem precisar se preocupar em como encaixar tudo.

- `No Angular`: o Javascript está no controle do fluxo e dos dados, entretanto, o HTML é feito de forma separada, dificultando a componentização.

- `No React`: o Javascript e o HTML se misturam, facilitando a componentização, porém, dificultando o controle do fluxo e dos dados pois estão misturados com o HTML.

### Na estrutura apresentada neste projeto:

 - O Javascript está no controle do fluxo e dos dados, como no Angular;

 - O HTML é gerado junto do Javascript, como no React;

 - A renderização é controlada pelo Javascript. Faça o que quiser e quando quiser.

 A parte do HTML a ser atualizada é sempre gerada novamente (HTML stateless). Porém, a renderização não afeta os dados pois o componente não é uma função, mas um objeto.

## Componentes

```Javascript
export function createHomePage() {
    // Eis o componente
    let component = {};

    // O componente só precisa ter um mainElement e uma função de init para executar a renderização.

    component.mainElement = document.createElement('section');
    component.mainElement.className = 'home-page';

    component.init = () => init(component);

    return component;
}

function init(component) {
    /*
    No init(), os sub componentes são adicionados usando o mainElement e renderizados pelos seus respectivos init().
    Com esse padrão, os componentes sempre sem encaixam corretamente.
    */

    let header = createHeaderComponent();
    header.init();

    // Adicione um componente ao outro apenas usando append() diretamente, sem necessidade de recuperá-los da tela
    component.mainElement.append(header.mainElement);
}
```

## Data Bind

```Javascript
let input = document.createElement('input');

// Atribua e obtenha o valor do input diretamente, sem necessidade de recupera-lo da tela
input.value = item.value;
item.value = input.value;

```

## Eventos

```Javascript
appEvents.add('name', () => funcToExec());
appEvents.exec('name');
```

## Navegação

```Javascript
appRoot.pages = [
    {path: '/home', label: 'Home', createComponent: createHomePage}
]
appRoot.pages.forEach(...)
appRoot.navToPage(page.path)
```

## CSS em JS

```Javascript
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
    }
}

applyCSS(element, css.nav)
```
