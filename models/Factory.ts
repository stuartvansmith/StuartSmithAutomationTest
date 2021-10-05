import {ContainerTypes} from './Enums'
import {Default, InventoryItem, ItemImage, Detail, PriceBar, AddToCart, IContainer} from './Containers'
import Item from './Item';

export default class Factory {
    static getContainer<T>(containerType: ContainerTypes): IContainer<T> {
        
        switch (containerType) {
            case ContainerTypes.Default:
                return new Default('Default');
            case ContainerTypes.InventoryItem:
                return new InventoryItem('InventoryItem');
            case ContainerTypes.ItemImage:
                return new ItemImage('Image');
            case ContainerTypes.Detail:
                return new Detail('Detail');
            case ContainerTypes.PriceBar:
                    return new PriceBar('PriceBar');
            case ContainerTypes.AddToCart:
                return new AddToCart('Add to cart');
            default:
                throw new Error("Container type not recognised");
        }
    }

    static async getItemInventory (itemsContainers: WebdriverIO.ElementArray): Promise<Default> {

        const inventory: Default = this.getContainer<Default>(ContainerTypes.Default);
        for (let index = 0; index < itemsContainers.length; index++) {
            const element = itemsContainers[index];
            let newItem = inventory.Payload.push(this.getContainer<InventoryItem>(ContainerTypes.InventoryItem));
            let newPrice = inventory.Payload[newItem].Payload.push(Factory.getContainer<PriceBar>(ContainerTypes.PriceBar));
            inventory.Payload[newItem].Payload[newPrice].PageElement=  await element.$('.inventory_item_price');
            let newAddToCart = inventory.Payload[newItem].Payload.push(Factory.getContainer<AddToCart>(ContainerTypes.AddToCart));
            inventory.Payload[newItem].Payload[newAddToCart].PageElement = await element.$('.btn_inventory');
        }
        

        return inventory;
    }
}