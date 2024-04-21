import {Component, OnInit} from '@angular/core';
import {ITableAction, ITableColumn} from "@organisms/table/table.component";
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit {

  actions: ITableAction[] = [
    {
      label: 'Eliminar', key: 'delete', action: (value: FinancialProduct) => {
        this.deleteProduct(value);
      }
    },
    {
      label: 'Editar', key: 'edit', action: (value: FinancialProduct) => {
        this.editProduct(value);
      }
    }
  ];
  columns: ITableColumn[] = [
    {label: 'Logo', key: 'logo', render: this.renderLogo.bind(this), type: 'column'},
    {label: 'Nombre del producto', key: 'name', type: 'column'},
    {label: 'Descripción', key: 'description', type: 'column'},
    {label: 'Fecha de liberación', key: 'date_release', render: this.dateRender.bind(this), type: 'column'},
    {label: 'Fecha de reestructuración', key: 'date_revision', render: this.dateRender.bind(this), type: 'column'},
    {label: '', key: 'actions', actions: this.actions, type: 'action'}
  ];
  allProducts: FinancialProduct[] = [];
  searchValue = '';

  constructor(private readonly financialProductService: FinancialProductService,
              private readonly router: Router,
              private readonly datePipe: DatePipe) {
  }

  get displayedProducts(): FinancialProduct[] {
    return this.allProducts.filter((product) => {
      return product.name.toLowerCase().includes(this.searchValue.toLowerCase());
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.financialProductService.listProducts()
      .subscribe({
        next: (response) => this.allProducts = response.data,
        error: (error) => console.error(error)
      });
  }

  private renderLogo(logo: string): string {
    return `<img src="${logo}" width="70" alt="Logo del producto" />`;
  }

  private dateRender(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  private deleteProduct(product: FinancialProduct): void {
    const productId = product.id;
    if (!productId) return;
    this.financialProductService.deleteProduct(productId)
      .subscribe({
        next: response => {
          if (!response.error) {
            this.allProducts = this.allProducts.filter((p) => p.id !== productId);
          }
        },
        error: (error) => console.error(error)
      });
  }

  private editProduct(product: FinancialProduct): void {
    this.router.navigate(['products/edit', product.id]);
  }
}
