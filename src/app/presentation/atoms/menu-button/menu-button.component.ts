import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

export interface IMenuOption {
  label: string;
  key: string;
}

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css'
})
export class MenuButtonComponent {

  @Input() options: IMenuOption[] = [];
  @Output() selectedOption = new EventEmitter<IMenuOption>();

  isOpen = false;

  constructor(private eRef: ElementRef) {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    this.isOpen = false;
    this.selectedOption.emit(option);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
