dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));

const elmArticlesOther = document.getElementById('articles-other');
const categoryName = document.getElementsByClassName('category-name');

const elmMainArticles = document.getElementById('main-article-category');
const btnLoadmore = document.getElementById('funLoadMore');
const elMyPagination = document.getElementById('total-page');

//  CHANGE CATEGORY

let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;


// RENDER MAIN ARTICLE
API.get(`categories_news/${id}/articles?limit=14&page=1`).then(res => {
    let data = res.data.data;    

    let htmlLarge = '';
    let htmlExtra = '';

    //BIG ARTICLE
    data.forEach((item, index) => {
        let relativeTime = dayjs(item.publish_date).fromNow();
        let link = creatLinkDetail(item.id, item.category.id);
        htmlLarge = /* html */ `				
        <div class="col-md-6 p-rl-1 p-b-2">
            <div class="bg-img1 size-a-3 how1 pos-relative"
                style="background-image: url(${item.thumb});">
                <a href="${link}" class="dis-block how1-child1 trans-03"></a>

                <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <a href="${link}"
                        class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        ${item.category.name}
                    </a>

                    <h3 class="how1-child2 m-t-14 m-b-10">
                        <a href="${link}" class="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
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
        
        // EXTRA ARTICLE
        if (index < 4) {
        htmlExtra += /* html */ `						
        <div class="col-sm-6 p-rl-1 p-b-2">
            <div class="bg-img1 size-a-14 how1 pos-relative"
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
        </div>`;
        }
        for (let i = 0; i < categoryName.length; i++) {
            categoryName[i].innerText = item.category.name;
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
});

getArticles(currentPage);
// btnLoadmore.addEventListener('click', function() {
//     currentPage++;
//     btnLoadmore.innerText = 'đang tải...';
//     btnLoadmore.disabled = true;
//     getArticles(currentPage);
// })

// btn ACTION
elMyPagination.addEventListener('click', function(e) {
    let elm = e.target;
    if (elm.classList.contains('page-item')) {
        currentPage = parseInt(elm.innerText); 
    }else if (elm.classList.contains('prevous')) {
        currentPage-- ;
    }else if (elm.classList.contains('next')) {
        currentPage++ ;
    }
    
    addOrUpdateUrlParameter('page', currentPage);
    getArticles(currentPage);
});

// URL
function addOrUpdateUrlParameter(key, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(key, value);
    const newURL = window.location.pathname + '?' + urlParams.toString();
    history.pushState(null, '', newURL)
}

// RENDER ARTICLES OTHER
function getArticles(page = 1) {
    API.get(`categories_news/${id}/articles?limit=14&page=${page}`).then(res => {
        let data = res.data.data;
        let total = res.data.meta.last_page;
        renderPagination(total);

        let htmlOther = /* html */ ``;
        data.forEach((item, index) => {
            if (index >= 4 && index < 14) {
                let relativeTime = dayjs(item.publish_date).fromNow();
                let link = creatLinkDetail(item.id, item.category.id);
                
                htmlOther += /* html */`
                <div class="col-sm-6 p-r-25 p-r-15-sr991">
                    <!-- Item latest -->
                    <div class="m-b-45">
                        <a href="${link}" class="wrap-pic-w hov1 trans-03">
                            <img src="${item.thumb}" alt="IMG">
                        </a>
        
                        <div class="p-t-16">
                            <h5 class="p-b-5">
                                <a href="${link}" class="f1-m-3 cl2 hov-cl10 trans-03">
                                    ${item.title}
                                </a>
                            </h5>
        
                            <span class="cl8">
                                <a href="${link}" class="f1-s-4 cl8 hov-cl10 trans-03">by ${item.author}</a>
        
                                <span class="f1-s-3 m-rl-3"> - </span>
        
                                <span class="f1-s-3">${relativeTime}</span>
                            </span>
                        </div>
                    </div>
                </div>`;
            }
            categoryName.innerText = item.category.name;
        });
        elmArticlesOther.innerHTML = htmlOther;
        // elmArticlesOther.innerHTML += htmlOther;
        // btnLoadmore.innerText = 'xem thêm';
        // btnLoadmore.disabled = false;

    })  .catch(function (error) {
        window.location.href = 'index.html';
      });
    
};

// PAGINATION
function renderPagination(total) {
    let disabledPrev = currentPage === 1 ? 'pointer-event-none' : '';
    let disabledNext = currentPage === total ? 'pointer-event-none' : '';

    let html = `<a href="#" class="btn btn-outline-success prevous ${disabledPrev}">Prevous</a>`;
    for (let i = 1; i <= total; i++) {
        const active = i === currentPage ? 'pagi-active pointer-event-none' : '';
        html += /* html */ `<a href="#" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 page-item ${active}">${i}</a>`;
    }
    html += `<a href="#" class="btn btn-outline-success next ${disabledNext}">Next</a>`;
    elMyPagination.innerHTML = html;
}

