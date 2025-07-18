import { Character, categoryLabels } from "./character.js";

export function createApp() {
  const app = {};

  app.mount = async function() {
    await this.fetchAndRenderCategory("all");
    this.categoryHandlers();
  }

  app.renderCharacters = function(json, category) {
    const rowElement = document.querySelector(".row");
    rowElement.innerHTML = "";

    const filterData = fetchCharacters(json, category);
    filterData.forEach(data => {
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

        if(selectedCategory !== "all") {
          await this.fetchAndRenderCategory(categoryLabels[selectedCategory]);
        } else {
          await this.fetchAndRenderCategory("all");
        }
      })
    }
  }

  app.fetchAndRenderCategory = async function(category) {
    const loadingDisplay = document.querySelector(".loading");
    loadingDisplay.style.display = "flex";
    const rowElement = document.querySelector(".row");
    rowElement.innerHTML = "";

    try {
      const response = await fetch("https://ihatov08.github.io/kimetsu_api/api/all.json");
      const json = await response.json();

      await new Promise(resolve => setTimeout(resolve, 200)); //ローディング画面を意図的に表示

      this.characters = json;
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

function fetchCharacters(json, category) {
  if(category !== "all"){
    // all以外のときにfilterで絞る
    json = json.filter(char => {
      return char.category === category;
    })
  }
  return json;
}
