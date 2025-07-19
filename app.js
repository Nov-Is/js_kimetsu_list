import { Character, categoryLabels } from "./character.js";

export function createApp() {
  const app = {};

  app.mount = async function() {
    await this.fetchAndRenderCategory("all");
    this.categoryHandlers();
  }

  app.renderCharacters = function(json) {
    const rowElement = document.querySelector(".row");
    rowElement.innerHTML = "";

    json.forEach(data => {
      const characterInstance = new Character(data);
      const characterElement = characterInstance.toHtmlElement();
      rowElement.appendChild(characterElement);
    });
  }

  app.categoryHandlers = function() {
    const buttonElements = document.querySelectorAll(".category-button-js");
    for(let element of buttonElements) {
      element.addEventListener("change", async (event) => {
        const selectedCategory = event.target.value;
        await this.fetchAndRenderCategory(selectedCategory);
      })
    }
  }

  app.fetchAndRenderCategory = async function(category) {
    const loadingDisplay = document.querySelector(".loading");
    loadingDisplay.style.display = "flex";
    const rowElement = document.querySelector(".row");
    rowElement.innerHTML = "";

    try {
      const baseApi = "https://ihatov08.github.io/kimetsu_api/"
      const apiEndpoint = category === "all" ? "api/all.json" : `api/${category}.json`
      const response = await fetch(baseApi + apiEndpoint);
      const json = await response.json();

      await new Promise(resolve => setTimeout(resolve, 200)); //ローディング画面を意図的に表示

      this.renderCharacters(json, category);
    } catch (error) {
      console.error("エラーが発生しました: ", error);
      const rowElement = document.querySelector(".row");
      rowElement.innerHTML = "<p>データの読み込みに失敗しました</p>";
    } finally {
      loadingDisplay.style.display = "none";
    }
  }
  return app;
}
