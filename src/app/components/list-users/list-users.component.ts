import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { UserInfo } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-list-users',
  imports: [ButtonComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  users: UserInfo[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
