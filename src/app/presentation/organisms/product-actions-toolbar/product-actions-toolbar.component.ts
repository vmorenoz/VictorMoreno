import {Component} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-product-actions-toolbar',
  templateUrl: './product-actions-toolbar.component.html',
  styleUrl: './product-actions-toolbar.component.css'
})
export class ProductActionsToolbarComponent {

  searchControl!: FormControl;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeControls();
  }

  initializeControls(): void {
    this.searchControl = this.formBuilder.control('');
  }
}
