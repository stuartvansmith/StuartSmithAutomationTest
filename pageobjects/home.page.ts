
import Utils from '../Shared/Utils'
import {ItemOrder} from '../Shared/enums';
import ItemScrollPage from './itemScrollPage';
import { Default } from '../models/Containers';
import Factory from '../models/Factory';



class HomePage extends ItemScrollPage {

   

    get shoppingCartbtn () {return $('.shopping_cart_link')};
    get sortProducts () { return $('.product_sort_container') };
    get availableItemPriceList () { return $$('//*[contains(@name,"add-to-cart")]')};
    get availableItemPrices () { return $$('.inventory_item_price')};
    get itemsContainers () {return $$('.inventory_item')};
    
    
    private  get Inventory() : Default {
        let itemList: WebdriverIO.ElementArray;
        this.itemsContainers.then((res)=>{
            itemList = res;
        }).catch((err)=>{
            console.log(err);
        });
        let inventory: Default;  
        Factory.getItemInventory(itemList).then((res)=>{
            inventory = res;
        });

        return inventory;
    }
    
    

    async setItemOrder (order: ItemOrder): Promise<void> {
       await this.sortProducts.selectByAttribute('value', order);
    }
    async addLowest (addCount: number) {
        await super.addLowest(addCount, await this.itemsContainers);
    }
     async verifyItemOrder (order: ItemOrder): Promise<boolean> {
        return await super.verifyItemOrder(order, await this.availableItemPrices);
    }
    async verifyItemOrderV2 (order: ItemOrder): Promise<boolean> {
        return await super.verifyItemOrderV2(order, this.Inventory);
     }


}


export default new HomePage();


