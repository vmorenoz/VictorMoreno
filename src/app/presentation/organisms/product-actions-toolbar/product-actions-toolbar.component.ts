import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-product-actions-toolbar',
  templateUrl: './product-actions-toolbar.component.html',
  styleUrl: './product-actions-toolbar.component.css'
})
export class ProductActionsToolbarComponent {

  @Output() search = new EventEmitter<string>();

  searchControl!: FormControl;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeControls();
  }

  initializeControls(): void {
    this.searchControl = this.formBuilder.control('');

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.search.emit(value));
  }
}
