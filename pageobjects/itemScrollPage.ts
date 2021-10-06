import Page from './page';
import Item from './Item';
import Utils from '../Shared/Utils'
import {ItemOrder} from '../Shared/enums';

import { ElementArray } from 'webdriverio';
import { Default } from '../models/Containers';

export default class ItemScrollPage extends Page {


    async addLowest (addCount: number, inventory: Default): Promise<void> {
        for (let count = 1; count <= addCount; count++) {
            inventory.Payload[inventory.Payload.length-count].Payload[1].PageElement.click();
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
            case ItemOrder.PriceLowToHigh:
                break;
            case ItemOrder.NameAtoZ:
                break;
            case ItemOrder.NameZtoA:
                break;
            default:
                break;
        }   
       }
   
}