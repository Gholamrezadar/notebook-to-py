interface CellType {
    attachments?: any;
    cell_type?: "code" | "markdown" | "raw";
    metadata?: any;
    outputs?: string[];
    source?: string[] ;
}

export default interface NotebookType {
    cells: CellType[];
    metadata?: any;
    nbformat?: number;
    nbformat_minor?: number;
}