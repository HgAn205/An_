let elmPopularDetail = document.getElementById('popular-detail');
let elmFtPopularDetail = document.getElementById('popular-detail-footer');
let elmBlog = document.getElementById('blog');
let elmDetailCategory = document.getElementById('detail-category');
let elmNameCategory = document.getElementById('name-category');
let elmBlogTitle = document.getElementsByClassName("blog-title");
dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));

let idCategoryDetail = 0;


API.get(`articles/${id}`).then(res => {
    let data = res.data.data;
    console.log(data);
    
    idCategoryDetail = data.category.id;
    elmNameCategory.innerText = data.category.name;
    elmNameCategory.href = `category.html?id=${data.category.id}`;
    for (let i = 0; i < elmBlogTitle.length; i++) {
        elmBlogTitle[i].innerText = data.title;
        
    }

        let relativeTime = dayjs(data.publish_date).fromNow();
        let html = /* html */ `							
        <div class="p-b-70">
        <a href="#" class="f1-s-10 cl2 hov-cl10 trans-03 text-uppercase">
            ${data.category.name}
        </a>

        <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2">
            ${data.title}
        </h3>

        <div class="flex-wr-s-s p-b-40">
            <span class="f1-s-3 cl8 m-r-15">
                <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
                    by ${data.author}
                </a>

                <span class="m-rl-3"> - </span>

                <span>${relativeTime}</span>
            </span>

            <span class="f1-s-3 cl8 m-r-15">
                5239 Views
            </span>

            <a href="#" class="f1-s-3 cl8 hov-cl10 trans-03 m-r-15">
                0 Comment
            </a>
        </div>

        <div class="wrap-pic-max-w p-b-30">
            <img src="${data.thumb}" alt="IMG">
        </div>
        <p class="f1-s-11 cl6 p-b-25">
            ${data.content}
        </p>
    </div>`;

    
    console.log(data.title);
    elmBlog.innerHTML = html;
    }); 



// RENDER POPULAR
API.get('articles/popular?limit=6').then((res) => {
    let data = res.data.data
    let htmlPopular = '';
    let htmlPopularFooter = '';

    data.forEach((item, index) => {
        let relativeTime = dayjs(item.publish_date).fromNow();
        let html = /* html */ `								
        <li class="flex-wr-sb-s p-b-30">
            <a href="#" class="size-w-10 wrap-pic-w hov1 trans-03">
                <img src="${item.thumb}" alt="IMG">
            </a>
    
            <div class="size-w-11">
                <h6 class="p-b-4">
                    <a href="blog-detail-02.html" class="f1-s-5 cl3 hov-cl10 trans-03">
                        ${item.title}
                    </a>
                </h6>
    
                <span class="cl8 txt-center p-b-24">
                    <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">${item.category.name}</a>
    
                    <span class="f1-s-3 m-rl-3"> - </span>
    
                    <span class="f1-s-3">${relativeTime}</span>
                </span>
            </div>
        </li>`;

        if (index < 3) {
            htmlPopular += html;
        }else {
            htmlPopularFooter += html;
        }
    });
    elmPopularDetail.innerHTML = htmlPopular;
    elmFtPopularDetail.innerHTML = htmlPopularFooter;
});

API.get(`categories_news/${cateid}/articles?limit=5`).then(res => {
    let data = res.data.data;
    console.log(data);
    let html = '';
    let count = 0;
    data.forEach(item => {
        if (item.id == id || count == 4) {
            return;
        }
        let relativeTime = dayjs(item.publish_date).fromNow();
            html += /* html */`
            <div class="col-sm-6 p-r-25 p-r-15-sr991">
                <!-- Item latest -->
                <div class="m-b-45">
                    <a href="blog-detail.html?id=${item.id}" class="wrap-pic-w hov1 trans-03">
                        <img src="${item.thumb}" alt="IMG">
                    </a>
        
                    <div class="p-t-16">
                        <h5 class="p-b-5">
                            <a href="blog-detail.html?id=${item.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
                                ${item.title}
                            </a>
                        </h5>
        
                        <span class="cl8">
                            <a href="blog-detail.html?id=${item.id}" class="f1-s-4 cl8 hov-cl10 trans-03">by ${item.author}</a>
        
                            <span class="f1-s-3 m-rl-3"> - </span>
        
                            <span class="f1-s-3">${relativeTime}</span>
                        </span>
                    </div>
                </div>
            </div>`;
        count++;
 
    });
    elmDetailCategory.innerHTML = html;
});
