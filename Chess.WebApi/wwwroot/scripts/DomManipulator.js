export class DomManipulator {
    createElement(elementName, parent) {
        const element = document.createElement(elementName);
        parent.appendChild(element);
        return element;
    }
}
//# sourceMappingURL=DomManipulator.js.map