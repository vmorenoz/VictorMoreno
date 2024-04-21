export class FinancialProduct {
  id: string | null = null;
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
    if (json.date_release) {
      let releaseDate = new Date(json.date_release);
      releaseDate.setMinutes(releaseDate.getMinutes() + releaseDate.getTimezoneOffset());
      product.date_release = releaseDate;
    }
    if (json.date_revision) {
      let revisionDate = new Date(json.date_revision);
      revisionDate.setMinutes(revisionDate.getMinutes() + revisionDate.getTimezoneOffset());
      product.date_revision = revisionDate;
    }
    return product;
  }

  static fromJsonArray(json: any): FinancialProduct[] {
    if (!json) return [];
    return json.map(FinancialProduct.fromJson);
  }
}
