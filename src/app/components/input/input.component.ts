import { Component, forwardRef, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements ControlValueAccessor {
  passwordVisibility: boolean = false;

  @Input() id!: string;
  @Input() formName!: string;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() isPasswordField: boolean = false;
  @Input() control!: FormControl | AbstractControl | null;

  get type(): string {
    if (this.isPasswordField) {
      return this.passwordVisibility ? 'text' : 'password';
    }
    return 'text';
  }

  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  get isInvalid(): boolean {
    return (this.control?.touched ?? false) && (this.control?.invalid ?? false);
  }

  get errorMessage(): string {
    if (this.control!.errors) {
      if (this.control!.errors['required']) {
        return 'Este campo é obrigatório.';
      }
      if (this.control!.errors['minlength']) {
        return `O mínimo é de ${
          this.control!.errors['minlength'].requiredLength
        } caracteres.`;
      }
      if (this.control!.errors['email']) {
        return 'Formato de e-mail inválido.';
      }
    }
    return '';
  }

  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
