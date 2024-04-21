import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {delay} from "rxjs";
import {Router} from "@angular/router";
import {ProductState} from "@state/product.state";

@Component({
  selector: 'app-product-actions-toolbar',
  templateUrl: './product-actions-toolbar.component.html',
  styleUrl: './product-actions-toolbar.component.css'
})
export class ProductActionsToolbarComponent implements OnInit {

  @Output() search = new EventEmitter<string>();

  searchControl!: FormControl;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initializeControls();
  }

  goToCreateProduct(): void {
    ProductState.selectedProduct.set(null);
    this.router.navigate(['/products/create']);
  }

  initializeControls(): void {
    this.searchControl = this.formBuilder.control('');

    this.searchControl.valueChanges
      .pipe(delay(300))
      .subscribe((value) => this.search.emit(value));
  }
}
