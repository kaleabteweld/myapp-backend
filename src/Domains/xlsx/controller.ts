import Xlsx from "../../Modules/xlsx";
import { Page, ConstructionItem, PrismaClient } from "@prisma/client";
import { ISection, IPages } from "../../Types";

export default class XlsxController {

    // singleton instance
    static instance: XlsxController;

    private prisma = new PrismaClient();

    constructor() {
        if (XlsxController.instance) {
            return XlsxController.instance;
        }

        XlsxController.instance = this;
    }

    public async deleteConstructionItem(id: number): Promise<any> {
        try {
            const _section = await this.prisma.constructionItem.delete({ where: { id: id } });
            return _section;
        } catch (error) {
            throw error;
        }

    }

    public async getPagesCount(): Promise<number> {
        try {
            const count = await this.prisma.page.count();
            return count;
        } catch (error) {
            throw error;
        }
    }

    public async getPages(skip?: number, take?: number): Promise<any> {
        try {
            return await this.prisma.page.findMany({
                skip: skip,
                take: take,
            });
        } catch (error) {
            throw error;
        }
    }

    public async getConstructionItem(pageId: number, skip?: number, take?: number): Promise<any> {
        try {
            return await this.prisma.constructionItem.findMany({
                where: { pageId: pageId },
                orderBy: { itemNo: 'asc' },
                skip: skip,
                take: take,
            });
        } catch (error) {
            throw error;
        }
    }

    public async add(pageId: number, section: ISection): Promise<any> {
        try {
            const _section = await this.createConstructionItem(section, pageId);
            return _section;
        } catch (error) {
            throw error;
        }
    }

    public async updateConstructionItem(id: number, section: ISection): Promise<any> {
        try {
            const _section = await this.prisma.constructionItem.update({
                where: { id: id },
                data: { ...section }
            });

            return _section;
        } catch (error) {
            throw error;
        }
    }

    public async upload(filePath: string): Promise<any> {
        try {
            const xlsx = new Xlsx(filePath);
            const pages: IPages[] = xlsx.read();

            await this.prisma.constructionItem.deleteMany({});
            await this.prisma.page.deleteMany({});

            for (const page in pages) {
                const _page = await this.createPage();

                Object.values(pages[page]).forEach(async (sections: any) => {
                    for (const section of sections) {
                        const _section = await this.createConstructionItem(section, _page.id);
                    }
                });
            }

            return;
        } catch (error) {
            throw error;
        }

    }

    private async createPage(): Promise<Page> {
        try {
            const page = await this.prisma.page.create({ data: { content: "" } });
            return page;
        } catch (error) {
            throw error;
        }
    }

    private async createConstructionItem(section: ISection, pageId: number): Promise<ConstructionItem> {
        try {
            const _section = await this.prisma.constructionItem.create({
                data: { ...section, pageId }
            });
            return _section;
        } catch (error) {
            throw error;
        }
    }


}