import Page from './page';

class CheckoutPage extends Page {
    get yourInformationBanner () {return $('.title=Checkout: Your Information') };
  
}

export default new CheckoutPage();