const API = axios.create({
    baseURL: 'https://apiforlearning.zendvn.com/api/v2',
  });
dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));
elmMainMenu = document.getElementById("main-menu");
elmPopular = document.getElementById("popular-category");
elmTags = document.getElementById("render-tags");
elmFtCategory = document.getElementById("footer-category");
elmFtPopular = document.getElementById("popular-footer");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
const cateid = parseInt(urlParams.get('cateid'));

function creatLinkDetail(id , categoryID) {
    return `blog-detail.html?id=${id}&cateid=${categoryID}`;
} 

//  RENDER MENU HEADER & TAGS & CATEGOTY
API.get('categories_news').then((res) => {
    const data = res.data.data;
    
    let htmlMain = '';
    let htmlOther  = '';
// MENU HEADER
    data.forEach((item, index) => {
        if (index < 6) {
            htmlMain += `<li class="main-menu-active no-child">
								<a href="category.html?id=${item.id}">${item.name}</a>
							</li>`
        }else {
            htmlOther += `<li class="">
								<a href="category.html?id=${item.id}">${item.name}</a>
							</li>`
        }
    });
    elmMainMenu.innerHTML = htmlMain + `<li class="main-menu-active">
                                            <a href="index.html">Danh mục khác</a>
                                            <ul class="sub-menu">
                                                ${htmlOther}
                                            </ul>
                                        </li>`;

//  RENDER TAGS
    let htmlTag = ''; 
    for (let i = 0; i < data.length; i++) {
        let link = `category.html?id=${data[i].id}`;

        if (id !== "" && data[i].id == id  || data[i].id == cateid) {
            htmlTag +=`<a href="${link}" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5 active-category">
            ${data[i].name}
            </a>`;
        }else {
            htmlTag += `<a href="${link}" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
            ${data[i].name}
            </a>`;
        }   
    }
    elmTags.innerHTML = htmlTag;


//  RENDER CATEGORY
    let htmlCategory = '';
    for (let i = 0; i < 5; i++) {
        htmlCategory +=  `							
        <li class="how-bor1 p-rl-5 p-tb-10">
            <a href="category.html?id=${data[i].id}" class="f1-s-5 cl11 hov-cl10 trans-03 p-tb-8">${data[i].name} (${data[i].articles_count})</a>
        </li>`
    }
    elmFtCategory.innerHTML = htmlCategory;
});
//  RENDER POPULAR & FOOTER POPULAR
API.get('articles/popular?limit=5').then((res) => {
    let data = res.data.data;
    
    // POPULAR
    let htmlPopular = '';
    data.forEach((item, index) => {
        let link = creatLinkDetail(item.id, item.category.id);
        htmlPopular += /* html */ 
        `<li class="flex-wr-sb-s p-b-22">
        <div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">${index + 1}</div>

        <a href="${link}" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
            ${item.title}
        </a>
    </li>`    
    });
    
    elmPopular.innerHTML = htmlPopular;

//  POPULAR FOOTER
    let htmlPopularFooter = ``;
    for (let i = 0; i < 3; i++) {
        let relativeTime = dayjs(data[i].publish_date).fromNow();        
        let link = creatLinkDetail(data[i].id, data[i].category.id)

        htmlPopularFooter += /* html */ `							
        <li class="flex-wr-sb-s p-b-20">
            <a href="${link}" class="size-w-4 wrap-pic-w hov1 trans-03">
                <img src="${data[i].thumb}" alt="IMG">
            </a>

            <div class="size-w-5">
                <h6 class="p-b-5">
                    <a href="${link}" class="f1-s-5 cl11 hov-cl10 trans-03">${data[i].title}</a>
                </h6>

                <span class="f1-s-3 cl6">${relativeTime}</span>
            </div>
        </li>`;
    };
    
    elmFtPopular.innerHTML = htmlPopularFooter;
});

