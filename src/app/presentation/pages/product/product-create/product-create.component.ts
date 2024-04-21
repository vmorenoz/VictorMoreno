import {Component, OnInit} from '@angular/core';
import {FinancialProduct} from "@domain/models/financial-product";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  createProduct(data: FinancialProduct): void {
    console.log('Create product', data);
  }
}
