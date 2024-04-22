import {Component, Input} from '@angular/core';

export interface ITableAction {
  label: string;
  key: string;
  action: (row: any) => void;
}

export interface ITableColumn {
  label: string;
  key: string;
  type: 'column' | 'action',
  actions?: ITableAction[];
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

  handleAction(actionKey: string, row: any): void {
    const column = this.columns.find(c => c.type === 'action');
    const action = column?.actions?.find(a => a.key === actionKey);
    action?.action(row);
  }
}
