dayjs.extend(dayjs.extend(window.dayjs_plugin_relativeTime));

const elmArticlesOther = document.getElementById('articles-other');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
console.log(id);

API.get(`categories_news/${id}/articles?limit=10&page=1`).then(res => {
    let data = res.data.data;
    // console.log(data);

    
    let htmlOther = /* html */ ``;
    data.forEach(item => {
        let relativeTime = dayjs(item.publish_date).fromNow();
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
    });
    elmArticlesOther.innerHTML = htmlOther;
});