/**
 * Aplica propriedades CSS a um elemento HTML
*/
export function applyCSS(element, css) {
    if (!element || !element.style || !css) {
        return;
    }
    Object.keys(css).forEach(prop => {
        let value = css[prop];
        element.style[prop] = value;
    });
}
