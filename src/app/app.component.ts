import {Component, OnInit} from '@angular/core';
import {FinancialProductService} from "@domain/services/financial-product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'VictorMoreno';

  constructor(private readonly financialProductService: FinancialProductService) {
  }

  ngOnInit() {
    this.financialProductService.listProducts()
      .subscribe((data) => {
        console.log(data);
      });
  }
}
