const elmBoxCategory = document.getElementById("box-category");
const listBoxCategories = document.getElementsByClassName("box-category");
const elmLastestArticles = document.getElementById("latest-articles");
const elmArticles = document.getElementById("main-article");
let elmShowPrice = document.getElementById('list-coin');
// console.log(listBoxCategories);
for(let i = 0; i < listBoxCategories.length; i++){
    let elm = listBoxCategories[i];
    let idCategory = elm.getAttribute('data-id');

    
// RENDER LIST ARTICLE BY CATEGORY 
    API.get(`categories_news/${idCategory}/articles?offset=0&limit=4&sort_by=id&sort_dir=desc`).then((res) => {
        const data = res.data.data;
        let relativeTime = dayjs(data[i].publish_date).fromNow();
        let link = creatLinkDetail(data[i].id, data[i].category.id);

        let htmlLeft = `<!-- Item post -->
            <div class="m-b-30">
                <a href="${link}" class="wrap-pic-w hov1 trans-03">
                    <img src="${data[0].thumb}" alt="IMG">
                </a>

                <div class="p-t-20">
                    <h5 class="p-b-5">
                        <a href="${link}"
                            class="f1-m-3 cl2 hov-cl10 trans-03">${data[0].title}</a>
                    </h5>

                    <span class="cl8">
                        <a href="${link}" class="f1-s-4 cl8 hov-cl10 trans-03">${data[0].author}</a>

                        <span class="f1-s-3 m-rl-3">
                            -
                        </span>

                        <span class="f1-s-3">${relativeTime}</span>
                    </span>
                </div>
            </div>`;
        let htmlRight = ``;
        for (let i = 1; i < data.length; i++){    
            let link = creatLinkDetail(data[i].id, data[i].category.id);
            htmlRight+= `<div class="flex-wr-sb-s m-b-30">
                            <a href="${link}" class="size-w-1 wrap-pic-w hov1 trans-03">
                                <img src="${data[i].thumb}" alt="IMG">
                            </a>

                            <div class="size-w-2">
                                <h5 class="p-b-5">
                                    <a href="${link}"
                                        class="f1-s-5 cl3 hov-cl10 trans-03">${data[i].title}</a>
                                </h5>

                                <span class="cl8">
                                    <a href="${link}" class="f1-s-6 cl8 hov-cl10 trans-03">${data[i].author}</a>

                                    <span class="f1-s-3 m-rl-3">
                                        -
                                    </span>

                                    <span class="f1-s-3">${relativeTime}</span>
                                </span>
                            </div>
                        </div>`;
        }
        let html = `<div class="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991 justify-content-md-between">
                        <!-- Brand tab -->
                        <h3 class="f1-m-2 cl12 tab01-title">
                            ${data[0].category.name}
                        </h3>
                        <!--  -->
                        <a href="${link}" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
                            View all
                            <i class="fs-12 m-l-5 fa fa-caret-right"></i>
                        </a>
                    </div>


                    <!-- Tab panes -->
                    <div class="tab-content p-t-35">
                        <!-- - -->
                        <div class="tab-pane fade show active" id="tab1-1" role="tabpanel">
                            <div class="row">
                                <div class="col-sm-6 p-r-25 p-r-15-sr991">
                                    ${htmlLeft}
                                </div>

                                <div class="col-sm-6 p-r-25 p-r-15-sr991">
                                    ${htmlRight}
                                </div>
                            </div>
                        </div>
                    </div>`;
        elm.innerHTML = html;
    });
}

API.get('articles?limit=8').then(res => {
    let data = res.data.data;
    let htmlArticle = '';		

    //RENDER LASTEST ARTICLE
    data.forEach((item, index) => {
        if (index < 4) {
        let link = creatLinkDetail(item.id, item.category.id);
        let relativeTime = dayjs(item.publish_date).fromNow();

        htmlArticle += /* html */ `						
        <div class="col-sm-6 p-r-25 p-r-15-sr991">
        <!-- Item latest -->
            <div class="m-b-45">
                <a href="${link}" class="wrap-pic-w hov1 trans-03"><img src="${item.thumb}" alt="IMG"></a>
    
                <div class="p-t-16">
                    <h5 class="p-b-5">
                        <a href="${link}" class="f1-m-3 cl2 hov-cl10 trans-03">${item.title}</a>
                    </h5>
    
                    <span class="cl8">
                        <a href="${link}" class="f1-s-4 cl8 hov-cl10 trans-03">by ${item.author}</a>
    
                        <span class="f1-s-3 m-rl-3"> - </span>
                        <span class="f1-s-3">${relativeTime}</span>
                    </span>
                </div>
            </div>
        </div>`
        }
    });
    elmLastestArticles.innerHTML = htmlArticle;

    //  RENDER MAIN ARTICLE
    let htmlSmallArticle = '';
    let htmlMediumArticle = '';
    let htmlLargeArticle = '';
    data.forEach((item, index) => {
        let link = creatLinkDetail(item.id, item.category.id);
        let relativeTime = dayjs(item.publish_date).fromNow();

        if (index == 4) {
            htmlLargeArticle = /* html */ `            
        <div class="col-md-6 p-rl-1 p-b-2">
            <div class="bg-img1 size-a-3 how1 pos-relative" style="background-image: url(${item.thumb});">
                <a href="${link}" class="dis-block how1-child1 trans-03"></a>

                <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <a href="${link}"
                        class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        ${item.category.name}</a>

                    <h3 class="how1-child2 m-t-14 m-b-10">
                        <a href="${link}" class="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
                            ${item.title}</a>
                    </h3>

                    <span class="how1-child2">
                        <span class="f1-s-4 cl11">${item.author}</span>

                        <span class="f1-s-3 cl11 m-rl-3">
                            -
                        </span>

                        <span class="f1-s-3 cl11">${relativeTime}</span>
                    </span>
                </div>
            </div>
        </div>`
        }else if (index == 5) {
            htmlMediumArticle = /* html */ `                    
                <div class="col-12 p-rl-1 p-b-2">
                    <div class="bg-img1 size-a-4 how1 pos-relative"
                        style="background-image: url(${item.thumb});">
                        <a href="${link}" class="dis-block how1-child1 trans-03"></a>

                        <div class="flex-col-e-s s-full p-rl-25 p-tb-24">
                            <a href="${link}"
                                class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                                ${item.category.name}
                            </a>

                            <h3 class="how1-child2 m-t-14">
                                <a href="${link}"
                                    class="how-txt1 size-a-7 f1-l-2 cl0 hov-cl10 trans-03">
                                    ${item.title}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>`
        }else if (index >= 6 && index <=8){
            htmlSmallArticle += /* html */ `                    
                <div class="col-sm-6 p-rl-1 p-b-2">
                    <div class="bg-img1 size-a-5 how1 pos-relative"
                        style="background-image: url(${item.thumb});">
                        <a href="${link}" class="dis-block how1-child1 trans-03"></a>
                
                        <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                            <a href="${link}"
                                class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                                ${item.category.name}
                            </a>
                
                            <h3 class="how1-child2 m-t-14">
                                <a href="${link}"
                                    class="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                                    ${item.title}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>`
        }
    });
    let htmlMainArticle = /* html */ `
            <div class="row m-rl--1">
                ${htmlLargeArticle}
                <div class="col-md-6 p-rl-1">
                    <div class="row m-rl--1">
                        ${htmlMediumArticle}
                        ${htmlSmallArticle}
                    </div>
                </div>
            </div>`;
    elmArticles.innerHTML = htmlMainArticle;
});

// Coin Table
API.get('https://apiforlearning.zendvn.com/api/get-coin').then((res) => {
    let data = res.data;
    let htmlPrice = '';
    data.forEach(item => {
        let Price24h = (Math.round(item.percent_change_24h * 100) / 100).toFixed(2);
        let PriceNow = (Math.round(item.price * 100) / 100).toFixed(2);
        
        htmlPrice += /* html */ `
        <tr>
            <td>${item.name}</td>
            <td>${PriceNow}</td>
            <td>${Price24h}</td>
        </tr>`
    });

    elmShowPrice.innerHTML = htmlPrice;
});