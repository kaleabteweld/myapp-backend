import express, { Response, Request } from "express";
import XlsxController from "./controller";
import { upload } from "./util";
import { MakeErrorHandler } from "../../Util/middlewares";

const xlsxRouter = express.Router();
const xlsxController = new XlsxController();


xlsxRouter.get("/", MakeErrorHandler(
    async (req: any, res: Response) => {
        res.send("Hello World!");
    }));


xlsxRouter.get("/pages", MakeErrorHandler(async (req: Request, res: Response) => {
    const skip = Number.parseInt((req.query.skip ?? '0').toString());
    const take = Number.parseInt((req.query.take ?? '100').toString());
    const pages = await xlsxController.getPages(skip, take);
    res.send(pages);
}));

xlsxRouter.get("/constructionItems", MakeErrorHandler(async (req: Request, res: Response) => {
    const pageId = Number.parseInt((req.query.pageId ?? '0').toString());
    const skip = Number.parseInt((req.query.skip ?? '0').toString());
    const take = Number.parseInt((req.query.take ?? '100').toString());
    const pages = await xlsxController.getConstructionItem(pageId, skip, take);
    res.send(pages);
}));

xlsxRouter.post("/:pageId", MakeErrorHandler(async (req: Request, res: Response) => {
    const pageId = Number.parseInt(req.params.pageId ?? '-1');
    const section = req.body;
    const pages = await xlsxController.add(pageId, section);
    res.send(pages);
}));

xlsxRouter.put("/:itemsId", MakeErrorHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.itemsId ?? '-1');
    const section = req.body;
    const pages = await xlsxController.updateConstructionItem(id, section);
    res.send(pages);
}));

xlsxRouter.delete("/:itemsId", MakeErrorHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.itemsId ?? '-1');
    const pages = await xlsxController.deleteConstructionItem(id);
    res.send(pages);
}));

xlsxRouter.get("/pages/count", MakeErrorHandler(async (req: Request, res: Response) => {
    const count = await xlsxController.getPagesCount();
    res.send(count.toString());
}));

xlsxRouter.post('/file/upload', upload.single('file'), MakeErrorHandler((req: Request, res: Response) => {
    const xlsxController = new XlsxController();
    if (req.file) xlsxController.upload(req.file.path);
    res.send('File uploaded successfully');
}));



export default xlsxRouter;