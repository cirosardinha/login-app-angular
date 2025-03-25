import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  providers: [],
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() buttonType?: string;

  @Output() onClick = new EventEmitter();
}
