export default class Item {
    price: number;
    addToCartBtn: WebdriverIO.Element;
    constructor(price:number, addtoCartButton:WebdriverIO.Element) {
        this.price = price;
        this.addToCartBtn = addtoCartButton;
    }
    addToCart() :void{
        this.addToCartBtn.click();
    }
}