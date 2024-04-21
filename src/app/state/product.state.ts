import {FinancialProduct} from "@domain/models/financial-product";
import {computed, signal} from "@angular/core";

export namespace ProductState {
  export const productList = signal<FinancialProduct[]>([]);
  export const searchValue = signal<string>('');
  export const selectedProduct = signal<FinancialProduct | null>(null);

  export const pageSize = signal<number>(5);
  export const currentPage = signal<number>(1);

  export const pagination = computed(() => {
    return {
      total: productList().length,
      totalPages: Math.ceil(productList().length / pageSize()),
    };
  });

  export const displayedProducts = computed(() => {
    const start = (currentPage() - 1) * pageSize();
    const end = start + pageSize();
    const search = searchValue().toLowerCase();
    return productList()
      .filter(product => search.length ? product.name.toLowerCase().includes(search) : true)
      .slice(start, end);
  });
}
