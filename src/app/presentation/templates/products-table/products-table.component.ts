import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "@organisms/table/table.component";
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit {

  columns: ITableColumn[] = [
    {label: 'Logo', key: 'logo', render: this.renderLogo.bind(this)},
    {label: 'Nombre del producto', key: 'name'},
    {label: 'Descripción', key: 'description'},
    {label: 'Fecha de liberación', key: 'date_release', render: this.dateRender.bind(this)},
    {label: 'Fecha de reestructuración', key: 'date_revision', render: this.dateRender.bind(this)},
  ];
  allProducts: FinancialProduct[] = [];
  searchValue = '';

  constructor(private readonly financialProductService: FinancialProductService,
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
}
