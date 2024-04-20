import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'accent' = 'default';

  get classes() {
    return `app-btn btn-${this.color}`
  }
}
