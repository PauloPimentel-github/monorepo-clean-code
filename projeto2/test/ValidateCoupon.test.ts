import ValidateCoupon from "../src/ValidateCoupon";

let validateCoupon: ValidateCoupon;

beforeEach(() => {
    validateCoupon = new ValidateCoupon();
});


test("Deve validar um cupom de desconto válido", async () => {
    const input = "VALE20";
    const output = await validateCoupon.execute(input);
    expect(output).toBeTruthy();
});

test("Deve validar um cupom de desconto expirado", async () => {
    const input = "VALE10";
    const output = await validateCoupon.execute(input);
    expect(output).toBeFalsy();
});

