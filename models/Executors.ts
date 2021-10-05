interface IExecute<T> {
    Start<T>();
}

class Execute implements IExecute<Execute> {
    Start<T>() {
        console.log('Default Execute... ');
    }
}

class InventoryItemExecute extends Execute{
    Start<T>(){
        console.log('inventory Item execute');
    }
}

class AddToCartExecute implements IExecute<AddToCartExecute> {
    Start<T>() {
        console.log('Add to cart execute');
    }
}

export  {Execute, InventoryItemExecute, AddToCartExecute, IExecute}