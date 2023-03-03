import SimulateFreight from "../src/SimulateFreight";

let simulateFreight: SimulateFreight;

beforeEach(() => {
    simulateFreight = new SimulateFreight();
});

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
