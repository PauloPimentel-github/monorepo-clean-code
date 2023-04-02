import express, { Request, Response } from "express";
import Checkout from "./application/usecase/Checkout";
import AxiosAdapater from "./infra/http/AxiosAdapter";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

const app = express();
app.use(express.json());

app.post("/checkout", async (req: Request, res: Response) => {
    try {
        const connection = new PgPromiseAdapter();
        const httpClient = new AxiosAdapater();
        const currencyGateway = new CurrencyGatewayHttp(httpClient);
        const productRepository = new ProductRepositoryDatabase(connection);
        const couponRepository = new CouponRepositoryDatabase(connection);
        const orderRepository = new OrderRepositoryDatabase(connection);
        const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
        const output = await checkout.execute(req.body);
        res.json(output);
    } catch (error: any) {
        res.status(422).json({
            message: error.message
        })
    }
})

app.listen(3000);
console.info('run port 3000...');
