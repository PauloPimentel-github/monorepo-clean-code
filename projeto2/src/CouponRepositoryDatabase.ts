import pgp from "pg-promise";

export default class CouponRepositoryDatabase {

    async getCoupon(code: string): Promise<any> {
        const connection = pgp()("postgres://postgresuser:postgrespwd@localhost:5432/postgresuser");
        const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [code]);
        await connection.$pool.end();
        return couponData;
    }
}