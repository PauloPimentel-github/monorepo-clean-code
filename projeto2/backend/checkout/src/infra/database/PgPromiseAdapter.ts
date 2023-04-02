import pgp from "pg-promise";
import Connection from "./Connection";

export default class PgPromiseAdapter implements Connection {

    connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgresuser:postgrespwd@localhost:5432/postgresuser");
    }
    
    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    
    async close(): Promise<void> {
        await this.connection.$pool.end();
    }

}