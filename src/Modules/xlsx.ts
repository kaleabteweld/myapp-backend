import * as XLSX from 'xlsx';

export default class Xlsx {

    workbook!: XLSX.WorkBook;
    worksheet!: XLSX.WorkSheet
    jsonData!: any[];
    headers!: string[];

    constructor(filePath: string) {
        try {
            this.workbook = XLSX.readFile(filePath);
            this.worksheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
            this.getJsonData();
        } catch (error) {
            console.log("Xlsx init ", error);
        }
    }

    getFileHeaders() {

        const headers: string[] = Object.values((this.jsonData[0])).map(header => this.convertToCamelCase((header as string).trim().toLocaleLowerCase()));
        this.headers = headers;
        return headers;
    }


    convertToCamelCase(str: string) {

        return str.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map((word, index) => {
            if (index == 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }

    getJsonData() {
        try {
            this.jsonData = XLSX.utils.sheet_to_json(this.worksheet);
            return this.jsonData;
        } catch (error) {
            console.log("Xlsx getJsonData ", error);
        }
    }

    read() {
        const rows = this.jsonData.slice(1);
        var section: any = {};
        var currentSection: any = null;

        var page: any = [];

        const headers = this.getFileHeaders();

        for (let index = 0; index < rows.length; index++) {

            const rawRow = rows[index];
            const rowList = Object.values(rawRow);

            if (this.isPageEnd(rowList)) {
                // console.log("page end");
                page.push(section);
                section = {};
                currentSection = null;
                //TODO: add titles 
                continue;
            }

            else if (this.isItem(rowList) || this.isSectionTitle(rowList) || this.isItemNoOnlyCalled(rowList)) {
                // console.log("currentSection", currentSection);
                if (currentSection != this.getItemNo(rowList, currentSection)) {

                    currentSection = this.getItemNo(rowList, currentSection);
                    section[currentSection] = [];
                }
                if (this.isItem(rowList) || this.isSectionTitle(rowList))

                    this.hasItemNo(rowList) ?
                        section[currentSection].push(this.applyHeaders(rowList, headers)) :
                        section[currentSection].push(this.applyHeaders([this.getItemNo(rowList, currentSection), ...rowList], headers));

            }
        }
        return page;
    }


    // items
    isItem(row: any[]) {
        if (row.length >= 3) {
            return true;
        }
        return false;
    }

    getItemNo(row: any[], currentSection: any) {
        // console.log("row", row);
        return typeof row[0] === 'number' ? row[0] : currentSection;
    }

    hasItemNo(row: any[]) {
        return typeof row[0] === 'number';
    }

    isItemNoOnlyCalled(row: any[]) {
        // that one edge case where the item no is only there [1.1]
        return typeof row[0] === 'number' && row.length == 1;
    }

    // sections
    isSection(row: any[]) {
        // console.log("row", row);
        if (typeof row[0] === 'number') {
            return true;
        }
        return false;
    }

    isSectionTitle(row: any[]) {
        if (typeof row[0] === 'number' && typeof row[1] === 'string') {
            return true;
        }
        return false;
    }

    // pages
    isPageTitle(row: any[]) {
        return !this.isItem(row);
    }

    isPageEnd(row: any[]) {
        if (typeof row[0] === 'string' && row[0].trim() === 'Total Carried To Summary') {
            return true;
        }
        return false;
    }

    applyHeaders(row: any, headers: string[] = this.headers, isTitle: boolean = false) {

        const _row: any = {};
        for (let i = 0; i < headers.length; i++) {

            if (row[i] == undefined)
                continue;

            var value = row[i];

            if (value === '-') value = null;

            _row[headers[i]] = value;
        };
        return _row;
    }

}