import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'accent' = 'default';
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();

  get classes() {
    return `app-btn btn-${this.color}`
  }

  handleClick() {
    this.onClick.emit();
  }
}
