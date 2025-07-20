export class Character {
  constructor(data) {
    this.name = data.name;
    this.category = data.category;
    this.image = data.image;
  }

  toHtmlElement() {
    const column = document.createElement("div");
    column.className = "col-4";

    const infoParagraph = document.createElement("p");
    infoParagraph.textContent = this.name;

    const imageElement = document.createElement("img");
    imageElement.src = `https://ihatov08.github.io${this.image}`;
    imageElement.className = "character-image";

    column.appendChild(infoParagraph);
    column.appendChild(imageElement);

    return column;
  }
}
