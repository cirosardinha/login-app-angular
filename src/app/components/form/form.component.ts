import { AuthService } from './../../services/auth/auth.service';
import { FormTexts } from './../../models/form-texts.model';
import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  isLoginPage: boolean = false;
  formTexts: FormTexts = {
    title: '',
    buttonText: '',
    linkText: '',
    linkButtonText: '',
    linkButtonRoute: '',
  };

  userForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.isLoginPage = this.router.url.includes('/login');
    this.setFormTexts();

    if (this.isLoginPage) {
      this.userForm.removeControl('name');
    }
  }

  setFormTexts() {
    if (this.isLoginPage) {
      this.formTexts = {
        title: 'Entrar com sua conta',
        buttonText: 'Entrar',
        linkText: 'Não possui uma conta?',
        linkButtonText: 'Cadastrar',
        linkButtonRoute: '/register',
      };
    } else {
      this.formTexts = {
        title: 'Criar uma conta',
        buttonText: 'Cadastrar',
        linkText: 'Já possui uma conta?',
        linkButtonText: 'Entrar',
        linkButtonRoute: '/login',
      };
    }
  }

  login() {
    this.authService.login(this.userForm.value).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        const errorMessage = {
          email: 'Email não cadastrado',
          password: 'Senha incorreta',
        };
        if (error?.error?.message === 'User not found') {
          this.toastr.error(errorMessage.email);
        } else if (error?.error?.message === 'Invalid password') {
          this.toastr.error(errorMessage.password);
        } else {
          this.toastr.error('Erro ao fazer login!');
        }
      }
    );
  }

  register() {
    this.userService.registerUser(this.userForm.value).subscribe(
      (response) => {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error?.error?.message === 'User already exists') {
          this.toastr.error('Usuário com esse email ja existe!');
        } else {
          this.toastr.error('Erro ao cadastrar usuário!');
        }
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isLoginPage) {
        this.login();
      } else {
        this.register();
      }
    }
  }
}
