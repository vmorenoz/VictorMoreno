import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ITableAction, ITableColumn, TableComponent} from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render value when render is called with column without render function', () => {
    const column: ITableColumn = {label: 'Test', key: 'test', type: 'column'};
    const value = 'test value';
    expect(component.render(column, value)).toBe(value);
  });

  it('should render transformed value when render is called with column with render function', () => {
    const column: ITableColumn = {
      label: 'Test',
      key: 'test',
      type: 'column',
      render: (value: any) => `transformed ${value}`
    };
    const value = 'test value';
    expect(component.render(column, value)).toBe(`transformed ${value}`);
  });

  it('should call action when handleAction is called with valid action key', () => {
    const actionKey = 'testAction';
    const row = {test: 'test value'};
    const action: ITableAction = {
      label: 'Test Action',
      key: actionKey,
      action: jest.fn()
    };
    const column: ITableColumn = {
      label: 'Test',
      key: 'test',
      type: 'action',
      actions: [action]
    };
    component.columns = [column];
    component.handleAction(actionKey, row);
    expect(action.action).toHaveBeenCalledWith(row);
  });

  it('should not call action when handleAction is called with invalid action key', () => {
    const actionKey = 'testAction';
    const invalidActionKey = 'invalidAction';
    const row = {test: 'test value'};
    const action: ITableAction = {
      label: 'Test Action',
      key: actionKey,
      action: jest.fn()
    };
    const column: ITableColumn = {
      label: 'Test',
      key: 'test',
      type: 'action',
      actions: [action]
    };
    component.columns = [column];
    component.handleAction(invalidActionKey, row);
    expect(action.action).not.toHaveBeenCalled();
  });
});
