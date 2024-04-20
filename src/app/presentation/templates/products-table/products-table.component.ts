import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "@organisms/table/table.component";
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit {

  columns: ITableColumn[] = [
    {label: 'Logo', key: 'logo'},
    {label: 'Nombre del producto', key: 'name'},
    {label: 'Descripción', key: 'description'},
    {label: 'Fecha de liberación', key: 'date_release'},
    {label: 'Fecha de revisión', key: 'date_revision'},
  ];

  data: FinancialProduct[] = [];

  constructor(private readonly financialProductService: FinancialProductService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.financialProductService.listProducts()
      .subscribe({
        next: (response) => this.data = response.data,
        error: (error) => console.error(error)
      });
  }
}
