import Coupon from "../src/domain/entity/Coupon";

test("Deve criar um cupom de desconto válido", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-04-05T10:00:00"));
    expect(coupon.isExpired(new Date("2023-03-05T10:00:00"))).toBeFalsy();
});

test("Deve criar um cupom de desconto inválido", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-03-05T10:00:00"));
    expect(coupon.isExpired(new Date("2023-12-05T10:00:00"))).toBeTruthy();
});

test("Deve calcular o desconto", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-04-05T10:00:00"));
    expect(coupon.calculateDiscount(1000)).toBe(200);
});