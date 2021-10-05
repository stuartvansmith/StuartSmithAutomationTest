import LoginPage from  '../pageobjects/login.page';
import HomePage from '../pageobjects/home.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.Page'
import  CartData  from './data/cartTest'
import {ItemOrder} from '../Shared/enums'
import homePage from '../pageobjects/home.page';

describe('Cart item test', () => {
    it('should log in to homepage', async () => {
        await LoginPage.open();
        await LoginPage.login(CartData.userName , CartData.password);
        await expect(HomePage.sortProducts).toBeExisting();
    });

    it('should change item order to (high to low)', async () => {
        await expect(HomePage.availableItemPriceList).toBeExisting();
        await HomePage.setItemOrder(ItemOrder.PriceHighToLow);
        await expect(await HomePage.verifyItemOrder(ItemOrder.PriceHighToLow)).toEqual(true) ;
    });

    it('should add the two lowest items to the cart', async () => {
        
        await HomePage.addLowest(2);
        await HomePage.shoppingCartbtn.click();
        await expect(CartPage.itemList).toBeElementsArrayOfSize(2);
    });

    it('should remove cheapest item from the cart', async () => {

        let currentItemCount: number;
        CartPage.itemList.then((obj) =>{ 
            currentItemCount = obj.length;
        });

        await CartPage.itemList[0].$('//*[contains(@name,"remove-sauce-labs")]').click();
      
        await expect(CartPage.itemList).toBeElementsArrayOfSize(currentItemCount-1);
    });

    it('should exit cart page and land at checkout', async () => {
        await CartPage.checkoutButton.click();
        await expect(CheckoutPage.yourInformationBanner).toBeExisting();
   
    });
});


