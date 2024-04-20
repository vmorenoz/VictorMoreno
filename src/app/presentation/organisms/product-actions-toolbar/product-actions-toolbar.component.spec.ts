import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionsToolbarComponent } from './product-actions-toolbar.component';

describe('ProductActionsToolbarComponent', () => {
  let component: ProductActionsToolbarComponent;
  let fixture: ComponentFixture<ProductActionsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductActionsToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductActionsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
