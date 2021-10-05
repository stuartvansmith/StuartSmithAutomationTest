export default class Utils {

    static async getPriceFromText (element: WebdriverIO.Element): Promise<number> {
        let stringPrice: string = await element.getText();
        let x = stringPrice.substring(1);
        return parseInt(x);
    }
}