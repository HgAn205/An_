class search extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = /* html */ `
    <div class="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6">
        <input class="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search"
            id="getClientKey">
        <button class="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
            <i class="zmdi zmdi-search"></i>
        </button>
    </div>`
    }
}

customElements.define("my-search", search);