import ProductRepository from "../../application/repository/ProductRepository";
import FreightGatewayHttp from "../../infra/gateway/FreightGatewayHttp";
import AxiosAdapater from "../../infra/http/AxiosAdapter";
import FreightGateway, { Input as FreightInput } from "../gateway/FreightGateway";

export default class SimulateFreight {

    constructor(
        readonly productRepository: ProductRepository,
        readonly freightGateway: FreightGateway = new FreightGatewayHttp(new AxiosAdapater())
    ) {
    }

    async execute(input: Input): Promise<Output> {
        const output: Output = {
            freight: 0
        };
        const freightInput: FreightInput = { items: [] };
        if (input.items) {
            for (const item of input.items) {
                const product = await this.productRepository.getProduct(item.idProduct);
                freightInput.items.push({ width: product.width, height: product.height, length: product.length, weight: product.weight, quantity: item.quantity });
            }    
        }
        const freightOutput = await this.freightGateway.calculateFreight(freightInput);
        output.freight = freightOutput.freight;
        return output;
    }
}

type Input = {
    items: { idProduct: number, quantity: number }[],
}

type Output = {
    freight: number
}
