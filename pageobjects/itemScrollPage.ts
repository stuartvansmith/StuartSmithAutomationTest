import Page from './page';
import Item from './Item';
import Utils from '../Shared/Utils'
import {ItemOrder} from '../Shared/enums';

import { ElementArray } from 'webdriverio';
import { Default } from '../models/Containers';

export default class ItemScrollPage extends Page {

   async addLowest (addCount: number, itemsContainers: ElementArray): Promise<void> {
        
        let itemObjs: Array<Item> = [];
        for (let index = 0; index < itemsContainers.length; index++) {
            const element = itemsContainers[index];

            let price: number = await Utils.getPriceFromText(await element.$('.inventory_item_price'));
            let addToCartButton = await element.$('.btn_inventory');
           
            itemObjs.push(new Item(price,addToCartButton));
            
        };
 
        for (let count = 1; count <= addCount; count++) {
             itemObjs[itemObjs.length-count].addToCart();    
        }
        
    }


    async verifyItemOrder(order: ItemOrder, inventory: Default): Promise<boolean> {
        switch (order) {
            case ItemOrder.PriceHighToLow:
                let highPrice: number = await Utils.getPriceFromText(inventory.Payload[0].Payload[0].PageElement);
                let listLen: number = inventory.Payload.length;
                let lowPrice: number = await Utils.getPriceFromText(inventory.Payload[listLen-1].Payload[0].PageElement);
                if (highPrice>lowPrice) {
                    return true;
                } else {
                    return false;
                }
        
            default:
                break;
        }   
       }
   
}