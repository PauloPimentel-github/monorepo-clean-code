import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import Connection from "../../src/infra/database/Connection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepository from "../../src/application/repository/ProductRepository";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

let connection: Connection;
let productRepository: ProductRepository;
let simulateFreight: SimulateFreight;

beforeEach(() => {
    connection = new PgPromiseAdapter();
    productRepository = new ProductRepositoryDatabase(connection);
    simulateFreight = new SimulateFreight(productRepository);
})

afterEach(async () => {
    await connection.close();
})

test("Deve calcular o frete para um pedido com 3 itens", async () => {
    const input = {
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ],
        from: "07263725",
        to: "88015600"
    }
    const output = await simulateFreight.execute(input);
    expect(output.freight).toBe(280);
});
