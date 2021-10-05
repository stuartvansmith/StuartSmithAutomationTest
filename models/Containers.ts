import {Execute, InventoryItemExecute, AddToCartExecute, IExecute} from './Executors';

interface IContainer<T> {
    name: string;
    PageElement: WebdriverIO.Element;
    Payload: Array<IContainer<T>>;
    Execute: IExecute<Execute>;
}

// container classes
class Container<T> implements IContainer<T> {
    name: string;
    constructor(name: string)  {
        this.name = name;
        this.Payload = new Array<Container<T>>();
        this.Execute = new Execute();
    };
    
    PageElement: WebdriverIO.Element;
    Payload: Array<Container<T>> ;
    Execute: IExecute<T>;
}
class Default extends Container<Default>
{
    constructor(name: string) {
        super(name);
        this.Payload = new Array<Container<Default>>();
        this.Execute = new Execute();
        
    }
}
class InventoryItem extends Container<InventoryItem> {
    constructor(name: string) {
        super(name);
        this.Execute = new InventoryItemExecute();
    }

}

class ItemImage extends Container<ItemImage>{
    constructor(name: string) {
        super(name);
        
    }
}
class Detail extends Container<Detail>{
    constructor(name: string) {
        super(name);
    }
}



class PriceBar extends Container<PriceBar> {
    constructor(name: string) {
        super(name);
        
    }
}
class AddToCart extends Container<AddToCart> {
    constructor(name: string) {
        super(name);
        this.Execute = new AddToCartExecute();
    }
}
export {Default, InventoryItem, ItemImage, Detail, PriceBar, AddToCart, IContainer}