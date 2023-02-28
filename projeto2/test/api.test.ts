import axios from "axios";

axios.defaults.validateStatus = () => {
    return true;
}

test("Não deve aceitar um pedido com cpf inválido", async () => {
    const input = {
        cpf: "406.302.170-27"
    }
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid cpf");
});

test("Deve criar um pedido vazio", async () => {
    const input = {
        cpf: "407.302.170-27"
    }
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(4872);
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: -1 }
        ]
    }
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid quantity");
});

test("Não deve criar um pedido com item duplicado", async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 1, quantity: 1 }
        ]
    }
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Duplicated item");
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid dimension");
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
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.freight).toBe(10);
    expect(output.total).toBe(40);
});