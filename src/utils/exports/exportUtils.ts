import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { SpeciesConfig, PoolColumn } from '@/config/species';

export interface ExportData {
    id: string;
    [key: string]: any;
}

export interface ExportOptions {
    filename?: string;
    title?: string;
    subtitle?: string;
    company?: string;
    logo?: string;
    includeTimestamp?: boolean;
}

export interface PDFOptions extends ExportOptions {
    orientation?: 'portrait' | 'landscape';
    fontSize?: number;
    headerColor?: string;
    alternateRowColor?: string;
}

export interface ExcelOptions extends ExportOptions {
    sheetName?: string;
    autoFitColumns?: boolean;
    includeFilters?: boolean;
    freezeHeader?: boolean;
}

export class PDFExporter {
    private config: SpeciesConfig;
    private options: PDFOptions;

    constructor(config: SpeciesConfig, options: PDFOptions = {}) {
        this.config = config;
        this.options = {
            orientation: 'landscape',
            fontSize: 10,
            headerColor: '#4F46E5',
            alternateRowColor: '#F8FAFC',
            includeTimestamp: true,
            ...options
        };
    }

    exportTable(data: ExportData[]): void {
        const doc = new jsPDF({
            orientation: this.options.orientation,
            unit: 'mm',
            format: 'a4'
        });

        this.addHeader(doc);

        const visibleColumns = this.getVisibleColumns();
        const headers = visibleColumns.map(col => col.header);

        const tableData = data.map(row =>
            visibleColumns.map(col => this.formatCellValue(row[col.id], col))
        );

        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: 40,
            styles: {
                fontSize: this.options.fontSize,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: this.options.headerColor,
                textColor: '#FFFFFF',
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: this.options.alternateRowColor,
            },
            columnStyles: this.getColumnStyles(visibleColumns),
            margin: { top: 40, bottom: 20 },
        });

        this.addFooter(doc, data.length);

        const filename = this.options.filename || `${this.config.displayName}_${Date.now()}.pdf`;
        doc.save(filename);
    }

    private addHeader(doc: jsPDF): void {
        if (this.options.logo) {
            // doc.addImage(this.options.logo, 'PNG', 10, 5, 20, 20);
        }

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        const title = this.options.title || `Reporte de Piscinas - ${this.config.displayName}`;
        doc.text(title, 20, 15);

        if (this.options.subtitle) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(this.options.subtitle, 20, 25);
        }

        if (this.options.includeTimestamp) {
            doc.setFontSize(8);
            doc.setTextColor(100);
            const timestamp = `Generado: ${new Date().toLocaleString()}`;
            doc.text(timestamp, 20, 35);
        }

        doc.setDrawColor(200);
        doc.line(20, 37, 190, 37);
    }

    private addFooter(doc: jsPDF, totalRecords: number): void {
        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(`Total de registros: ${totalRecords}`, 20, 200);

            doc.text(`Página ${i} de ${pageCount}`, 150, 200);

            if (this.options.company) {
                doc.text(this.options.company, 20, 205);
            }
        }
    }

    private getVisibleColumns(): PoolColumn[] {
        return this.config.pools.columns.filter(col =>
            !['notes', 'actions'].includes(col.id)
        );
    }

    private formatCellValue(value: any, column: PoolColumn): string {
        if (value === null || value === undefined) return '-';

        switch (column.type) {
            case 'number':
                return `${value}${column.unit ? ` ${column.unit}` : ''}`;
            case 'date':
                return new Date(value).toLocaleDateString();
            case 'boolean':
                return value ? 'Sí' : 'No';
            default:
                return String(value);
        }
    }

    private getColumnStyles(columns: PoolColumn[]): Record<number, any> {
        const styles: Record<number, any> = {};

        columns.forEach((col, index) => {
            switch (col.type) {
                case 'number':
                    styles[index] = { halign: 'right' };
                    break;
                case 'date':
                    styles[index] = { halign: 'center' };
                    break;
                default:
                    styles[index] = { halign: 'left' };
            }
        });

        return styles;
    }
}

export class ExcelExporter {
    private config: SpeciesConfig;
    private options: ExcelOptions;

    constructor(config: SpeciesConfig, options: ExcelOptions = {}) {
        this.config = config;
        this.options = {
            sheetName: this.config.displayName,
            autoFitColumns: true,
            includeFilters: true,
            freezeHeader: true,
            includeTimestamp: true,
            ...options
        };
    }

    exportTable(data: ExportData[]): void {
        const wb = XLSX.utils.book_new();

        const worksheetData = this.prepareWorksheetData(data);

        const ws = XLSX.utils.aoa_to_sheet(worksheetData);

        this.applyWorksheetStyles(ws, worksheetData);

        XLSX.utils.book_append_sheet(wb, ws, this.options.sheetName);

        const filename = this.options.filename || `${this.config.displayName}_${Date.now()}.xlsx`;
        XLSX.writeFile(wb, filename);
    }

    private prepareWorksheetData(data: ExportData[]): any[][] {
        const visibleColumns = this.getVisibleColumns();

        const headers = visibleColumns.map(col => col.header);

        const titleRow = [this.options.title || `Reporte de Piscinas - ${this.config.displayName}`];
        const timestampRow = this.options.includeTimestamp
            ? [`Generado: ${new Date().toLocaleString()}`]
            : [];
        const emptyRow = [''];

        const dataRows = data.map(row =>
            visibleColumns.map(col => this.formatCellValue(row[col.id], col))
        );

        return [
            titleRow,
            ...timestampRow.length ? [timestampRow] : [],
            emptyRow,
            headers,
            ...dataRows
        ];
    }

    private applyWorksheetStyles(ws: XLSX.WorkSheet, data: any[][]): void {
        const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');

        if (this.options.autoFitColumns) {
            const colWidths: any[] = [];
            for (let c = range.s.c; c <= range.e.c; c++) {
                let maxWidth = 10;
                for (let r = range.s.r; r <= range.e.r; r++) {
                    const cell = ws[XLSX.utils.encode_cell({ r, c })];
                    if (cell && cell.v) {
                        maxWidth = Math.max(maxWidth, String(cell.v).length);
                    }
                }
                colWidths[c] = { width: Math.min(maxWidth + 2, 50) };
            }
            ws['!cols'] = colWidths;
        }

        if (this.options.freezeHeader) {
            const headerRowIndex = this.options.includeTimestamp ? 3 : 2;
            ws['!freeze'] = XLSX.utils.encode_cell({ r: headerRowIndex, c: 0 });
        }

        if (this.options.includeFilters) {
            const headerRowIndex = this.options.includeTimestamp ? 3 : 2;
            const dataStartCell = XLSX.utils.encode_cell({ r: headerRowIndex, c: 0 });
            const dataEndCell = XLSX.utils.encode_cell({ r: range.e.r, c: range.e.c });
            ws['!autofilter'] = { ref: `${dataStartCell}:${dataEndCell}` };
        }
    }

    private getVisibleColumns(): PoolColumn[] {
        return this.config.pools.columns.filter(col =>
            !['actions'].includes(col.id)
        );
    }

    private formatCellValue(value: any, column: PoolColumn): any {
        if (value === null || value === undefined) return '';

        switch (column.type) {
            case 'number':
                return Number(value);
            case 'date':
                return new Date(value);
            case 'boolean':
                return value ? 'Sí' : 'No';
            default:
                return String(value);
        }
    }
}

export function createPDFExporter(config: SpeciesConfig, options?: PDFOptions): PDFExporter {
    return new PDFExporter(config, options);
}

export function createExcelExporter(config: SpeciesConfig, options?: ExcelOptions): ExcelExporter {
    return new ExcelExporter(config, options);
}
