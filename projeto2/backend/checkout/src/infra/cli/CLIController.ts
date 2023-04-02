import Checkout from "../../application/usecase/Checkout";
import CLIHandler from "./CLIHandler";

export default class CLIController {

    constructor(readonly handler: CLIHandler, readonly checkout: Checkout) {
        const input: Input = { cpf: "123", items: [] };
        handler.on("set-cpf", (params: any) => {
            input.cpf = params;
        });
        handler.on("add-item", (params: any) => {
            const [idProduct, quantity] = params.split(" ");
            input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
        });
        handler.on("checkout", async (params: any) => {
            try {
                const output = await checkout.execute(input);
                handler.write(JSON.stringify(output));
            } catch (error: any) {
                handler.write(error.message);
            }
        });
    }
}

type Input = {
    cpf: string,
    items: { idProduct: number, quantity: number }[],
    coupon?: string,
    from?: string,
    to?: string
}