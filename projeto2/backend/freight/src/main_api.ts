import AxiosAdapater from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import CalculateFreight from "./application/usecase/CalculateFreight";

const connection = new PgPromiseAdapter();
const httpClient = new AxiosAdapater();
const calculateFreight = new CalculateFreight();

const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttpServer();
new HttpController(httpServer, calculateFreight);
httpServer.listen(3002);
console.info('run port 3002...');