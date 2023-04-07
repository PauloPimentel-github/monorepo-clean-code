import CalculateFreight from "../../src/application/usecase/CalculateFreight";

let calculateFreight: CalculateFreight;

beforeEach(() => {
    calculateFreight = new CalculateFreight();
})

afterEach(async () => {
})

test("Deve calcular o frete para um pedido com 3 itens", async () => {
    const input = {
        items: [
            { width: 100, height: 30, length: 10, weight: 3, quantity: 1 }
        ],
        from: "07263725",
        to: "88015600"
    }
    const output = await calculateFreight.execute(input);
    expect(output.freight).toBe(30);
});
