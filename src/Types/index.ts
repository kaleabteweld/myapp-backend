export interface IPages {
    [key: string]: ISection[]
}

export interface ISection {
    itemNo?: number;
    description?: string,
    unit?: string,
    qty?: number,
    rate?: number,
    amount?: number
}