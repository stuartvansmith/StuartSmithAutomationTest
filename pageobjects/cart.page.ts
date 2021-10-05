import { resolveModuleName } from 'typescript';
import Page from './page'

class CartPage extends Page {
    
    get itemList () {return $$('.cart_item')}
    get checkoutButton () {return $('.checkout_button') }
    
//await CartPage.itemList[0].$('//*[contains(@name,"remove-sauce-labs")]').click();


}

export default new CartPage();