import {Component, OnInit} from '@angular/core';
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  constructor(readonly productService: FinancialProductService,
              private readonly router: Router) {
  }

  createProduct(data: FinancialProduct): void {
    this.productService.createProduct(data)
      .subscribe(response => {
        alert(response.message);
        this.router.navigate(['/products/list']);
      });
  }
}
