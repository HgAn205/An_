const API = axios.create({
    baseURL: 'https://apiforlearning.zendvn.com/api/v2',
  });

elmMainMenu = document.getElementById("main-menu");
elmPopular = document.getElementById("popular-category");
elmTags = document.getElementById("render-tags");
elmFtCategory = document.getElementById("footer-category");
elmFtPopular = document.getElementById("popular-footer");

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
                                            <a href="#">Danh mục khác</a>
                                            <ul class="sub-menu">
                                                ${htmlOther}
                                            </ul>
                                        </li>`;
//  RENDER TAGS
    let htmlTag = '';
    for (let i = 0; i < data.length; i++) {
        htmlTag +=  
    `<a href="${data[i].id}" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
        ${data[i].name}
    </a>`
    }
    elmTags.innerHTML = htmlTag;
//  RENDER CATEGORY
    let htmlCategory = '';
    for (let i = 0; i < 5; i++) {
        htmlCategory +=  `							
        <li class="how-bor1 p-rl-5 p-tb-10">
            <a href="#" class="f1-s-5 cl11 hov-cl10 trans-03 p-tb-8">${data[i].name} (${data[i].articles_count})</a>
        </li>`
    }
    elmFtCategory.innerHTML = htmlCategory;
});
//  RENDER POPULAR & FOOTER POPULAR
API.get('articles/popular?limit=5').then((res) => {
    let data = res.data.data;
    
// POPULAR
    let html = '';
    data.forEach((item, index) => {
        html += /* html */ 
        `<li class="flex-wr-sb-s p-b-22">
        <div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
            ${index + 1}
        </div>

        <a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
            ${item.title}
        </a>
    </li>`    
    });
    elmPopular.innerHTML = html;
//  POPULAR FOOTER
    let htmlPopularFooter = '';
    for (let i = 0; i < 3; i++) {
        let relativeTime = dayjs(data[i].publish_date).fromNow();

        htmlPopularFooter += /* html */ `							
        <li class="flex-wr-sb-s p-b-20">
            <a href="#" class="size-w-4 wrap-pic-w hov1 trans-03">
                <img src="${data[i].thumb}" alt="IMG">
            </a>

            <div class="size-w-5">
                <h6 class="p-b-5">
                    <a href="#" class="f1-s-5 cl11 hov-cl10 trans-03">${data[i].title}</a>
                </h6>

                <span class="f1-s-3 cl6">${relativeTime}</span>
            </div>
        </li>`
    };
    elmFtPopular.innerHTML = htmlPopularFooter;
});

