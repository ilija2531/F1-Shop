
import * as XLSX from "xlsx";

export const exportOrdersToExcel = (orders) => {
  const data = orders.map((order) => ({
    "Име": order.user?.name,
    "Email": order.user?.email,
    "Вкупно (ден)": order.totalPrice,
    "Платено": order.isPaid ? "Да" : "Не",
    "Статус": order.status,
    "Датум": new Date(order.createdAt).toLocaleString(),
    "Производи": order.items
      .map((item) => `${item.product?.name || "N/A"} × ${item.quantity}`)
      .join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Нарачки");

  XLSX.writeFile(workbook, "narachki.xlsx");
};
