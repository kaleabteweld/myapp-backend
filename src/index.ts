import { PrismaClient } from '@prisma/client'
import { makeServer } from './Util/Factories';


const app = makeServer();

const prisma = new PrismaClient();

prisma.$connect().then(() => {
    console.log(`[+] DataBase conneced`);

}).catch((error: any) => {
    console.log(`[-] DataBase Not conneced`);
    console.log(error);
});


const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
    console.log(`[+] server started at http://localhost:${port}`);
});