import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[]) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a file name
    const fileName = 'data.xlsx';

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);

    console.log('Exporting data to Excel:', data);
};