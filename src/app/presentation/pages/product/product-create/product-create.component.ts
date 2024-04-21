import {Component, OnInit} from '@angular/core';
import {FinancialProduct} from "@domain/models/financial-product";
import {FinancialProductService} from "@domain/services/financial-product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  constructor(private readonly productService: FinancialProductService) {
  }

  ngOnInit() {
  }

  createProduct(data: FinancialProduct): void {
    this.productService.createProduct(data)
      .subscribe(response => {
        alert(response.message);
      });
  }
}
