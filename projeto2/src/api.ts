import express, { Request, Response } from "express";
import Checkout from "./application/usecase/Checkout";

const app = express();
app.use(express.json());

app.post("/checkout", async (req: Request, res: Response) => {
    try {
        const checkout = new Checkout();
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
