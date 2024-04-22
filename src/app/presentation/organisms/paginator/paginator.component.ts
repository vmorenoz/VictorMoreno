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
  @Input() pageSize: number = 5;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

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

  private initPageControl(): void {
    this.pageSizeControl = this.formBuilder.control(this.pageSize);
    this.pageSizeControl.valueChanges.subscribe((value) => this.pageSizeChange.emit(value));
  }

  changePage(page: number): void {
    this.pageChange.emit(page);
  }

  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  previousPage(): void {
    console.log('previousPage', this.currentPage)
    this.changePage(this.currentPage - 1);
  }
}
