import { validate } from "./version2/validator";
import pgp from "pg-promise";

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
        const connection = pgp()("postgres://postgresuser:postgrespwd@localhost:5432/postgresuser");
        try {
            const isValid = validate(input.cpf);
            if (!isValid) throw new Error("Invalid cpf");
            const output: Output = {
                total: 0,
                freight: 0
            };
            const items: number[] = [];
            if (input.items) {
                for (const item of input.items) {
                    if (item.quantity <= 0) throw new Error("Invalid quantity");
                    if (items.includes(item.idProduct)) throw new Error("Duplicated item");
                    const [productData] = await connection.query("select * from cccat10.product where id_product = $1", item.idProduct);
                    if (productData.width <= 0 || productData.height <= 0 || productData.length <= 0 || parseFloat(productData.weight) <= 0) throw new Error("Invalid dimension")
                    output.total += parseFloat(productData.price) * item.quantity;
                    const volume = productData.width / 100 * productData.height / 100 * productData.length / 100;
                    const density = parseFloat(productData.weight) / volume;
                    const itemFreight = 1000 * volume * (density / 100);
                    output.freight += Math.max(itemFreight, 10) * item.quantity;
                    items.push(item.idProduct);
                }    
            }
            if (input.coupon) {
                const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [input.coupon]);
                if (couponData.expire_date.getTime() > new Date().getTime()) {
                    const percentage = parseFloat(couponData.percentage);
                    output.total -= (output.total * percentage) / 100;
                }
            }
            if (input.from && input.to) {
                output.total += output.freight;
            }
            console.log(output);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            await connection.$pool.end();
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

type Output = {
    total: number,
    freight: number
}