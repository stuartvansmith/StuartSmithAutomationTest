import Page from './page';
import Item from './Item';
import Utils from '../Shared/Utils'
import {ItemOrder} from '../Shared/enums';

import { textChangeRangeIsUnchanged } from 'typescript';
import { ChainablePromiseElement, ElementArray } from 'webdriverio';

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

    async  verifyItemOrder (order: ItemOrder, availableItemPrices: ElementArray): Promise<boolean> {
        switch (order) {
            case ItemOrder.PriceHighToLow:
               
                let highPrice: number = await Utils.getPriceFromText(availableItemPrices[0]);
                let listLen: number =  (await availableItemPrices).length;
                let lowPrice: number = await Utils.getPriceFromText(availableItemPrices[listLen-1]);

                if (highPrice>lowPrice) {
                    return true;
                } else {
                    return false;
                }
            case ItemOrder.PriceLowToHigh:
                return true;
            case ItemOrder.NameAtoZ:
                return true;
            case ItemOrder.NameZtoA:
                return true;
            default:
                throw new Error(`Invalid ItemOrder param: ${order}`);
        }

    }
}