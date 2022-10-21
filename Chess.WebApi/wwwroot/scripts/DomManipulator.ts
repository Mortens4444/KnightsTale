export class DomManipulator {
	public createElement(elementName: string, parent: HTMLElement): HTMLElement {
		const element: HTMLElement = document.createElement(elementName);
		parent.appendChild(element);
		return element;
	}
}