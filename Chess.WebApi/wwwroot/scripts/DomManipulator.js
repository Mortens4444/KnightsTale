var DomManipulator = /** @class */ (function () {
    function DomManipulator() {
    }
    DomManipulator.prototype.createElement = function (elementName, parent) {
        var element = document.createElement(elementName);
        parent.appendChild(element);
        return element;
    };
    return DomManipulator;
}());
export { DomManipulator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tTWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEb21NYW5pcHVsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUFBO0lBTUEsQ0FBQztJQUxPLHNDQUFhLEdBQXBCLFVBQXFCLFdBQW1CLEVBQUUsTUFBbUI7UUFDNUQsSUFBTSxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEb21NYW5pcHVsYXRvciB7XHJcblx0cHVibGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWU6IHN0cmluZywgcGFyZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSk7XHJcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcbn0iXX0=