dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));
const elmBoxCategory = document.getElementById("box-category");
const listBoxCategories = document.getElementsByClassName("box-category");
const elmLastestArticles = document.getElementById("latest-articles");

// console.log(listBoxCategories);
for(let i = 0; i < listBoxCategories.length; i++){
    let elm = listBoxCategories[i];
    let idCategory = elm.getAttribute('data-id');
    
    API.get(`categories_news/${idCategory}/articles?offset=0&limit=4&sort_by=id&sort_dir=desc`).then((res) => {
        const data = res.data.data;
        let relativeTime = dayjs(data[i].publish_date).fromNow();

        let htmlLeft = `<!-- Item post -->
            <div class="m-b-30">
                <a href="blog-detail-01.html" class="wrap-pic-w hov1 trans-03">
                    <img src="${data[0].thumb}" alt="IMG">
                </a>

                <div class="p-t-20">
                    <h5 class="p-b-5">
                        <a href="blog-detail-01.html"
                            class="f1-m-3 cl2 hov-cl10 trans-03">${data[0].title}</a>
                    </h5>

                    <span class="cl8">
                        <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">${data[0].author}</a>

                        <span class="f1-s-3 m-rl-3">
                            -
                        </span>

                        <span class="f1-s-3">${relativeTime}</span>
                    </span>
                </div>
            </div>`;
        let htmlRight = ``;
        for (let i = 1; i < data.length; i++){    
            htmlRight+= `<div class="flex-wr-sb-s m-b-30">
                            <a href="blog-detail-01.html" class="size-w-1 wrap-pic-w hov1 trans-03">
                                <img src="${data[i].thumb}" alt="IMG">
                            </a>

                            <div class="size-w-2">
                                <h5 class="p-b-5">
                                    <a href="blog-detail-01.html"
                                        class="f1-s-5 cl3 hov-cl10 trans-03">${data[i].title}</a>
                                </h5>

                                <span class="cl8">
                                    <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">${data[i].author}</a>

                                    <span class="f1-s-3 m-rl-3">
                                        -
                                    </span>

                                    <span class="f1-s-3">${relativeTime}</span>
                                </span>
                            </div>
                        </div>`;
        }
        let html = `<div class="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991">
                        <!-- Brand tab -->
                        <h3 class="f1-m-2 cl12 tab01-title">
                            ${data[0].category.name}
                        </h3>
                        <!--  -->
                        <a href="category-01.html" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
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
    
        data.forEach(item => {
            
            
    
        });
        elm.innerHTML = html;
    });
}

API.get('articles?limit=4').then(res => {
    let data = res.data.data;
    console.log(data);
    let htmlArticle = '';					
    
    data.forEach(item => {
        let relativeTime = dayjs(item.publish_date).fromNow();
        htmlArticle += /* html */ `						
        <div class="col-sm-6 p-r-25 p-r-15-sr991">
        <!-- Item latest -->
            <div class="m-b-45">
                <a href="#" class="wrap-pic-w hov1 trans-03"><img src="${item.thumb}" alt="IMG"></a>
    
                <div class="p-t-16">
                    <h5 class="p-b-5">
                        <a href="blog-detail-01.html" class="f1-m-3 cl2 hov-cl10 trans-03">${item.title}</a>
                    </h5>
    
                    <span class="cl8">
                        <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">by ${item.author}</a>
    
                        <span class="f1-s-3 m-rl-3"> - </span>
                        <span class="f1-s-3">${relativeTime}</span>
                    </span>
                </div>
            </div>
        </div>`
    });
    elmLastestArticles.innerHTML = htmlArticle;
});
