export function newel(tag: string, props?: any) {
    return addnewel(null, tag, props);
}

export function addnewel(
    parent: HTMLElement | null,
    tag: string,
    props?: any
): HTMLElement {
    let elmt = document.createElement(tag);
    if (parent) {
        parent.append(elmt);
    }
    if (props) {
        applyValues(props, elmt);
    }
    return elmt;
}

export function applyValues(from: any, to: any) {
    if (!from || !to) {
        return;
    }
    Object.keys(from).forEach((prop) => {
        let value = from[prop];
        if (!value) {
            to[prop] = value;
            return;
        }
        if (typeof value === "object" && !Array.isArray(value)) {
            let toValue = to[prop];
            if (
                toValue &&
                typeof toValue === "object" &&
                !Array.isArray(toValue)
            ) {
                applyValues(value, toValue);
                return;
            }
        }
        to[prop] = value;
    });
}

/**
 * element: HTMLElement,
 * 
 * css: object with css properties
 * css.selector: select childs with css selector
 * css.styles: css object list to apply on childs
 */
export function applyCSS(element: HTMLElement, css: any) {
    if (!element || !css) {
        return;
    }
    if (Array.isArray(css)) {
        css.forEach((e) => applyCSS(element, e));
        return;
    }
    css = { ...css };
    let selector = css.selector;
    delete css.selector;
    if (selector) {
        element
            .querySelectorAll(selector)
            .forEach((elmt) => applyCSS(elmt, css));
        return;
    }
    let styles = css.styles;
    delete css.styles;
    Object.keys(css).forEach((prop) => {
        setValue(element.style, prop, css[prop]);
    });
    if (!styles) {
        return;
    }
    if (!Array.isArray(styles)) {
        styles = [styles];
    }
    styles.forEach((style: any) => {
        if (!style.selector) {
            return;
        }
        style = { ...style };
        let slct = style.selector;
        delete style.selector;
        element.querySelectorAll(slct).forEach((elmt) => applyCSS(elmt, style));
    });
}

export function getValue(obj: any, param: string) {
    return obj[param];
}

export function setValue(obj: any, param: string, value: any) {
    obj[param] = value;
}

export function getNumber(
    num: string | number | null | undefined,
    def: number = 0
): number {
    if (num === null || num === undefined) {
        return def;
    }
    let val = Number.parseFloat(num + "");
    if (Number.isNaN(val)) {
        return def;
    }
    return val;
}

export function onclick(element: HTMLElement, callback: Function) {
    onevent(element, "click", callback);
}

export function onchange(element: HTMLElement, callback: Function) {
    onevent(element, "change", callback);
}

function onevent(element: HTMLElement, type: string, callback: Function) {
    if (!element || !callback) {
        return;
    }
    element.addEventListener(type, (evt) => callback(evt));
}
