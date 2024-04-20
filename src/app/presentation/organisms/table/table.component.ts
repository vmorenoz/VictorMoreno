import {Component, Input} from '@angular/core';

export interface ITableColumn {
  label: string;
  key: string;
  render?: (value: any) => string | number | HTMLElement;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() columns: ITableColumn[] = [];
  @Input() data: any[] = [];

  render(column: ITableColumn, value: any): string | number | HTMLElement {
    return column.render ? column.render(value) : value;
  }
}
