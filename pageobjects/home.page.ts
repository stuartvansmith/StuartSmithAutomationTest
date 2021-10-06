
import {ItemOrder} from '../Shared/enums';
import ItemScrollPage from './itemScrollPage';
import Factory from '../models/Factory';



class HomePage extends ItemScrollPage {

    get shoppingCartbtn () {return $('.shopping_cart_link')};
    get sortProducts () { return $('.product_sort_container') };
    get availableItemPriceList () { return $$('//*[contains(@name,"add-to-cart")]')};
    get availableItemPrices () { return $$('.inventory_item_price')};
    get itemsContainers () {return $$('.inventory_item')};
    

    async setItemOrder (order: ItemOrder): Promise<void> {
       await this.sortProducts.selectByAttribute('value', order);
    }
  
    async addLowest (addCount: number) {
        await super.addLowest(addCount, await  Factory.getItemInventory(await this.itemsContainers));
    }
    async verifyItemOrder (order: ItemOrder): Promise<boolean> {
        return await super.verifyItemOrder(order, await Factory.getItemInventory(await this.itemsContainers));
    }

}


export default new HomePage();


