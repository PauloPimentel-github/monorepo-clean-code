import Checkout from "../src/Checkout";

let checkout: Checkout;

beforeEach(() => {
    checkout = new Checkout();
});

test("Não deve aceitar um pedido com cpf inválido", async () => {
    const input = {
        cpf: "406.302.170-27",
        items: []
    }
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido vazio", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: []
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ],
        coupon: "VALE20"
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto expirado", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ],
        coupon: "VALE10"
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: -1 }
        ]
    };
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid quantity"));
});

test("Não deve criar um pedido com item duplicado", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 1, quantity: 1 }
        ]
    }
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Duplicated item"));
});

test("Deve criar um pedido com 1 produto calculando o frete", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 3 }
        ],
        from: "07263725",
        to: "88015600"
    }
    const output = await checkout.execute(input);
    expect(output.freight).toBe(90);
    expect(output.total).toBe(3090);
});

test("Não deve criar um pedido se o produto tiver alguma dimensão negativa", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 4, quantity: 1 }
        ]
    }
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid dimension"));
});

test("Deve criar um pedido com 1 produto calculando o frete valor mínimo", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 3, quantity: 1 }
        ],
        from: "07263725",
        to: "88015600"
    }
    const output = await checkout.execute(input);
    expect(output.freight).toBe(10);
    expect(output.total).toBe(40);
});

test("Deve criar um pedido com 1 produto em dólar", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 5, quantity: 1 }
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(3000);
});