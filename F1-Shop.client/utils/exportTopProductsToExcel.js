import * as XLSX from "xlsx";

export const exportTopProductsToExcel = (topProducts) => {
  const data = topProducts.map((product, index) => ({
    "#": index + 1,
    Назив: product.name,
    Продадено: product.totalSold,
    Категорија: product.category?.name || "Непозната",
    Цена: `${product.price} ден`
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Најкупувани");
  XLSX.writeFile(workbook, "najkupuvani_produkti.xlsx");
};
