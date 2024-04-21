import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() title: string = 'Modal Title';

  isVisible: boolean = false;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
