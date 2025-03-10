dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));

const elmArticlesOther = document.getElementById('articles-other');
const categoryName = document.getElementById('category-name');
const elmMainArticles = document.getElementById('main-article-category');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

API.get(`categories_news/${id}/articles?limit=14&page=1`).then(res => {
    let data = res.data.data;
    console.log(data);

    // RENDER MAIN ARTICLE BY CATEGORY
    let htmlLarge = '';
    let htmlExtra = '';
    data.forEach((item, index) => {

    
        let relativeTime = dayjs(item.publish_date).fromNow();
        htmlLarge = /* html */ `				
        <div class="col-md-6 p-rl-1 p-b-2">
            <div class="bg-img1 size-a-3 how1 pos-relative"
                style="background-image: url(${item.thumb});">
                <a href="blog-detail-01.html" class="dis-block how1-child1 trans-03"></a>

                <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <a href="#"
                        class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        ${item.category.name}
                    </a>

                    <h3 class="how1-child2 m-t-14 m-b-10">
                        <a href="#" class="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
                            ${item.title}
                        </a>
                    </h3>

                    <span class="how1-child2">
                        <span class="f1-s-4 cl11">${item.author}</span>

                        <span class="f1-s-3 cl11 m-rl-3"> - </span>

                        <span class="f1-s-3 cl11">${relativeTime}</span>
                    </span>
                </div>
            </div>
        </div>`;				
        if (index < 4) {
        htmlExtra += /* html */ `						
        <div class="col-sm-6 p-rl-1 p-b-2">
            <div class="bg-img1 size-a-14 how1 pos-relative"
                style="background-image: url(${item.thumb});">
                <a href="#" class="dis-block how1-child1 trans-03"></a>

                <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <a href="#"
                        class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        ${item.category.name}
                    </a>

                    <h3 class="how1-child2 m-t-14">
                        <a href="#"
                            class="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                            ${item.title}
                        </a>
                    </h3>
                </div>
            </div>
        </div>`;
        }
        
    });
    let html = /* html */ `			
        <div class="row m-rl--1" >
            ${htmlLarge}
        <div class="col-md-6 p-rl-1">
            <div class="row m-rl--1">
                ${htmlExtra}
            </div>
        </div>
    </div>`;
    elmMainArticles.innerHTML = html;

    // RENDER ARTICLES OTHER
    let htmlOther = /* html */ ``;
    data.forEach((item, index) => {
        if (index >= 4 && index < 14) {
            let relativeTime = dayjs(item.publish_date).fromNow();
            categoryName.innerText = item.category.name;
            htmlOther += /* html */`
            <div class="col-sm-6 p-r-25 p-r-15-sr991">
                <!-- Item latest -->
                <div class="m-b-45">
                    <a href="#" class="wrap-pic-w hov1 trans-03">
                        <img src="${item.thumb}" alt="IMG">
                    </a>
    
                    <div class="p-t-16">
                        <h5 class="p-b-5">
                            <a href="blog-detail-01.html" class="f1-m-3 cl2 hov-cl10 trans-03">
                                ${item.title}
                            </a>
                        </h5>
    
                        <span class="cl8">
                            <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">by ${item.author}</a>
    
                            <span class="f1-s-3 m-rl-3"> - </span>
    
                            <span class="f1-s-3">${relativeTime}</span>
                        </span>
                    </div>
                </div>
            </div>`;
        }

    });
    elmArticlesOther.innerHTML = htmlOther;
});