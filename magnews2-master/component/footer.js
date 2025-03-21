class footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallBack(){
        this.innerHTML = /* html */ ``
    }
}

customElements.define("my-footer", footer);