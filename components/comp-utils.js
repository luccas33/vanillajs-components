export function newel(tag, props) {
    return addnewel(null, tag, props);
}

export function addnewel(parent, tag, props) {
    let elmt = document.createElement(tag);
    if (parent) {
        parent.append(elmt);
    }
    if (props) {
        applyValues(props, elmt);
    }
    return elmt;
}

export function applyValues(from, to) {
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

export function applyCSS(element, css) {
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
        element.style[prop] = css[prop];
    });
    if (!styles) {
        return;
    }
    if (!Array.isArray(styles)) {
        styles = [styles];
    }
    styles.forEach((style) => {
        if (!style.selector) {
            return;
        }
        style = { ...style };
        let slct = style.selector;
        delete style.selector;
        element.querySelectorAll(slct).forEach((elmt) => applyCSS(elmt, style));
    });
}

export function onclick(element, callback) {
  onevent(element, 'click', callback);
}

export function onchange(element, callback) {
  onevent(element, 'change', callback);
}

function onevent(element, type, callback) {
  if (!element || !callback) {
    return;
  }
  element.addEventListener(type, callback);
}
