export class DomManipulator {
	createElement(elementName: string, parent: HTMLElement): HTMLElement {
		let element: HTMLElement = document.createElement(elementName);
		parent.appendChild(element);
		return element;
	}
}