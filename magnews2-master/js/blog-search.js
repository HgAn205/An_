let showBlog = document.getElementById("show-blog-list");
let searchName = document.getElementById("search-keyName");

const keyword = urlParams.get('keyword');
searchName.innerText = `kết quả cho "${keyword}"`;

API.get(`articles/search?q=${keyword}&limit=6&page=1`).then((res) => {
    let data = res.data.data;
    let html = '';

    data.forEach(item => {
        let relativeTime = dayjs(item.publish_date).fromNow();
        let link = creatLinkDetail(item.id, item.category.id);
        html += /* html */ `
        <!-- Item post -->
        <div class="flex-wr-sb-s p-t-40 p-b-15 how-bor2">
            <a href="${link}"
                class="size-w-8 wrap-pic-w hov1 trans-03 w-full-sr575 m-b-25">
                <img src="${item.thumb}" alt="IMG">
            </a>

            <div class="size-w-9 w-full-sr575 m-b-25">
                <h5 class="p-b-12">
                    <a href="${link}" class="f1-l-1 cl2 hov-cl10 trans-03 respon2">
                        ${item.title}
                    </a>
                </h5>

                <div class="cl8 p-b-18">
                    <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
                        by ${item.author}
                    </a>

                    <span class="f1-s-3 m-rl-3"> - </span>

                    <span class="f1-s-3">${relativeTime}</span>
                </div>

                <p class="f1-s-1 cl6 p-b-24">${item.description}</p>

                <a href="${link}" class="f1-s-1 cl9 hov-cl10 trans-03">
                    Read More
                    <i class="m-l-2 fa fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>`
        
    });
    showBlog.innerHTML = html;
});

