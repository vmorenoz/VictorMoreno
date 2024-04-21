export class FinancialProduct {
  id?: string;
  name: string = '';
  description: string = '';
  logo: string = '';
  date_release: string | Date | null = null;
  date_revision: string | Date | null = null;

  static fromJson(json: any): FinancialProduct {
    const product = new FinancialProduct();
    product.id = json.id;
    product.name = json.name;
    product.description = json.description;
    product.logo = json.logo;
    product.date_release = json.date_release;
    product.date_revision = json.date_revision;
    return product;
  }
}
