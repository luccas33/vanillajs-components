# VanillaJS Components

### Componentes, navegação, data bind e eventos com JS vanilla de forma mais fácil que Angular/React

## Componentes

```Javascript
export function createHomePage() {
    let component = {};

    component.mainElement = document.createElement('section');
    component.mainElement.className = 'home-page';

    component.init = () => init(component);

    return component;
}

function init(component) {
    let header = createHeaderComponent();
    header.init();
    component.mainElement.append(header.mainElement);
}
```

## Navegação

```Javascript
appRoot.pages = [
    {path: '/home', label: 'Home', createComponent: createHomePage}
]
appRoot.pages.forEach(...)
appRoot.navToPage(page.path)
```

## Data Bind

```Javascript
let input = document.createElement('input')
obj.value = input.value
input.value = obj.value
```

## Eventos

```Javascript
appEvents.add('name', () => funcToExec())
appEvents.exec('name')
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
