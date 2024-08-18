import * as http from "@/lib/helpers/fetch";
import { Invoice, PaginationData } from "@/models";

const endpoint = "invoices";
export async function getInvoices(page: number = 1, query: string = "") {
  return await http.getRequest<PaginationData<Invoice>>(
    `${endpoint}?page=${page}&invoice_number=${query}`
  );
}
