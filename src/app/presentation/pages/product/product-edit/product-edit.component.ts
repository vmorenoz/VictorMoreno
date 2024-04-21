import {Component, OnInit} from '@angular/core';
import {FinancialProductService} from "@domain/services/financial-product.service";
import {FinancialProduct} from "@domain/models/financial-product";
import {Router} from "@angular/router";
import {ProductState} from "@state/product.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  constructor(private readonly productService: FinancialProductService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    if (!ProductState.selectedProduct()) {
      this.router.navigate(['/products/list']);
    }
  }

  updateProduct(data: FinancialProduct): void {
    this.productService.updateProduct(data)
      .subscribe(response => {
        alert(response.message);
      });
  }
}
