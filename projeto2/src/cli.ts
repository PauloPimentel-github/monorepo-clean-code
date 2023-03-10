import Checkout from "./application/usecase/Checkout";

const input: Input = { cpf: "123", items: [] };
process.stdin.on("data", async (chunk) => {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith("set-cpf")) {
        input.cpf = command.replace("set-cpf ", "");
    }
    if (command.startsWith("add-item")) {
        const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
        input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) })
    }
    if (command.startsWith("checkout")) {
        try {
            const checkout = new Checkout();
            const output = await checkout.execute(input);
            console.log(output);
        } catch (error: any) {
            console.error(error.message);
        }
    }
})

type Input = {
    cpf: string,
    items: { idProduct: number, quantity: number }[],
    coupon?: string,
    from?: string,
    to?: string
}
