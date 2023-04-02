import Checkout from "../../src/application/usecase/Checkout";
import GetOrder from "../../src/application/usecase/GetOrder";
import AxiosAdapater from "../../src/infra/http/AxiosAdapter";
import CLIController from "../../src/infra/cli/CLIController";
import CLIHandler from "../../src/infra/cli/CLIHandler";
import Connection from "../../src/infra/database/Connection";
import CouponRepository from "../../src/application/repository/CouponRepository";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "../../src/infra/gateway/CurrencyGatewayHttp";
import OrderRepository from "../../src/application/repository/OrderRepository";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepository from "../../src/application/repository/ProductRepository";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

let checkout: Checkout;
let getOrder: GetOrder;
let connection: Connection;
let productRepository: ProductRepository;
let couponRepository: CouponRepository;
let orderRepository: OrderRepository;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    const httpClient = new AxiosAdapater();
    const currencyGateway = new CurrencyGatewayHttp(httpClient);
    productRepository = new ProductRepositoryDatabase(connection);
    couponRepository = new CouponRepositoryDatabase(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
    getOrder = new GetOrder(orderRepository);
});

afterEach(async () => {
    await connection.close();
})

test("Deve testar o cli", async () => {
    let output: any;
    const handler = new class extends CLIHandler {
        write(text: string): void {
            output = JSON.parse(text);
        }
    };
    new CLIController(handler, checkout);
    handler.type("set-cpf 407.302.170-27");
    handler.type("add-item 1 1");
    handler.type("add-item 2 1");
    handler.type("add-item 3 3");
    await handler.type("checkout");
    expect(output.total).toBe(6090);
    expect(output.freight).toBe(280);
});