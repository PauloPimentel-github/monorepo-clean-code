import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import Connection from "../../src/infra/database/Connection";
import CouponRepository from "../../src/application/repository/CouponRepository";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

let connection: Connection;
let couponRepository: CouponRepository;
let validateCoupon: ValidateCoupon;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    couponRepository = new CouponRepositoryDatabase(connection);
    validateCoupon = new ValidateCoupon(couponRepository);
})

afterEach(async () => {
    await connection.close();
})


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

