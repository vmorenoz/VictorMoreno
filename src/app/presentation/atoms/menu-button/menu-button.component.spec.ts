import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuButtonComponent, IMenuOption} from './menu-button.component';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit selected option and close dropdown when selectOption is called', () => {
    const option: IMenuOption = {label: 'Option 1', key: 'option1'};
    component.isOpen = true;
    jest.spyOn(component.selectedOption, 'emit');
    component.selectOption(option);
    expect(component.isOpen).toBe(false);
    expect(component.selectedOption.emit).toHaveBeenCalledWith(option);
  });

  it('should not close dropdown when clickout is triggered inside the component', () => {
    const event = {target: 'inside'};
    jest.spyOn(component.eRef.nativeElement, 'contains').mockReturnValue(true);
    component.isOpen = true;
    component.clickout(event);
    expect(component.isOpen).toBe(true);
  });

  it('should close dropdown when clickout is triggered outside the component', () => {
    const event = {target: 'outside'};
    jest.spyOn(component.eRef.nativeElement, 'contains').mockReturnValue(false);
    component.isOpen = true;
    component.clickout(event);
    expect(component.isOpen).toBe(false);
  });

  it('should toggle dropdown state when toggleDropdown is called', () => {
    component.isOpen = false;
    component.toggleDropdown();
    expect(component.isOpen).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen).toBe(false);
  });
});
