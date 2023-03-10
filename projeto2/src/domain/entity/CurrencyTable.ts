export default class CurrencyTable {

    private value: { [currency: string]: number };

    public constructor() {
        this.value = {
            "BRL": 1
        };
    }

    public addCurrency(currency: string, value: number) {
        this.value[currency] = value;
    }

    public getCurrency(currency: string) {
        return this.value[currency];
    }
}
