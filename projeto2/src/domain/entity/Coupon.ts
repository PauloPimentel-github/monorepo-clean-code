export default class Coupon {

    public constructor(readonly code: string, readonly percentage: number, readonly expireDate: Date) {}

    isExpired(today: Date): boolean {
        return this.expireDate.getTime() < today.getTime()
    }

    calculateDiscount(amount: number): number {
        return (amount * this.percentage) / 100;
    }
}
