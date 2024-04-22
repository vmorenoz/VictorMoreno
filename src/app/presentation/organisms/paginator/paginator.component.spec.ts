import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaginatorComponent} from './paginator.component';
import {AtomsModule} from "@atoms/atoms.module";
import {MoleculesModule} from "@molecules/molecules.module";
import {ReactiveFormsModule} from "@angular/forms";

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [ReactiveFormsModule, AtomsModule, MoleculesModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageSizeChange event when pageSizeControl value changes', () => {
    jest.spyOn(component.pageSizeChange, 'emit');
    component.pageSizeControl.setValue(10);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(10);
  });

  it('should emit pageChange event when changePage is called', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.changePage(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should increment currentPage by 1 when nextPage is called', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.currentPage = 1;
    component.nextPage();
    expect(component.pageChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should decrement currentPage by 1 when previousPage is called', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.currentPage = 2;
    component.previousPage();
    expect(component.pageChange.emit).toHaveBeenCalledTimes(1);
  });
});
