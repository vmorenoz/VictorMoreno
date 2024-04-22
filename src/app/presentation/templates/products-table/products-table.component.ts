import {Component, OnInit, ViewChild} from '@angular/core';
import {ITableAction, ITableColumn} from "@organisms/table/table.component";
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ProductState} from "@state/product.state";
import {ModalComponent} from "@organisms/modal/modal.component";
import {delay} from "rxjs";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal!: ModalComponent;

  actions: ITableAction[] = [
    {
      label: 'Eliminar', key: 'delete', action: (value: FinancialProduct) => {
        this.askToDeleteProduct(value);
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
  productToDelete!: FinancialProduct | null;
  isLoading = true;

  constructor(private readonly financialProductService: FinancialProductService,
              private readonly router: Router,
              private readonly datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.financialProductService.listProducts()
      .pipe(delay(1400))
      .subscribe({
        next: (response) => {
          ProductState.productList.set(response.data);
          this.isLoading = false;
        },
        error: (error) => console.error(error)
      });
  }

  private renderLogo(logo: string): string {
    return `<img src="${logo}" width="70" alt="Logo del producto" />`;
  }

  private dateRender(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  private askToDeleteProduct(product: FinancialProduct): void {
    this.productToDelete = product;
    this.deleteModal.open();
  }

  deleteProduct(): void {
    const productId = this.productToDelete?.id;
    if (!productId) return;
    this.financialProductService.deleteProduct(productId)
      .subscribe({
        next: response => {
          if (response.error) return;

          ProductState.productList.update((products) => products.filter((p) => p.id !== productId));
          this.deleteModal.close();
          this.productToDelete = null;
        },
        error: (error) => console.error(error)
      });
  }

  editProduct(product: FinancialProduct): void {
    ProductState.selectedProduct.set(product);
    this.router.navigate(['products/edit']);
  }

  protected readonly ProductState = ProductState;
}
