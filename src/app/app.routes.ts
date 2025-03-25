import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: FormComponent,
  },
  {
    path: 'register',
    component: FormComponent,
  },
  {
    path: '',
    component: ListUsersComponent,
    canActivate: [authGuard],
  },
];
