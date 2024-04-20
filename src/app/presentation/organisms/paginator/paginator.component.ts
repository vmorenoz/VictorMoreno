import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ISelectOption} from "@molecules/select-input/select-input.component";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  pageSizeControl!: FormControl;
  pageSizeOptions: ISelectOption[] = [
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 20, label: '20'},
  ];

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initPageControl();
  }

  initPageControl(): void {
    this.pageSizeControl = this.formBuilder.control(5);
    this.pageSizeControl.valueChanges.subscribe(() => this.pageChange.emit(1));
  }
}
