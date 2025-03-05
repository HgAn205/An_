const API = axios.create({
    baseURL: 'https://apiforlearning.zendvn.com/api/v2',
  });

const elmMainMenu = document.getElementById("mainMenu");
const elMainMenuCategory = document.getElementById("mainMenuCategory");
const elmMainMenuOther = document.getElementById("mainMenuOther")
API.get('categories_news').then((res) => {
    const category = res.data.data;
    console.log(category);
    let html = '';
    let htmlMenuOther = '';
    let htmlMenuCategory = '';

    category.forEach((item, index) => {
        if (index < 3) {
            html += /*html*/ `<li><a href="${item.link}">${item.name}</a></li>`
        }else if (index = 3 && index <= 5 ){
            htmlMenuCategory += /*html*/ `<li><a href="${item.link}">${item.name}</a></li>`
        }else {
            htmlMenuOther += /*html*/ `<li><a href="${item.link}">${item.name}</a></li>`
        }
    });
    elmMainMenu.innerHTML = html;
    elMainMenuCategory.innerHTML = htmlMenuCategory;
    elmMainMenuOther.innerHTML = htmlMenuOther;
});