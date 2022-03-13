import { Component } from '@angular/core';
import { UserService } from '../../core/services';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = false;
  username = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.userService.currentUser.subscribe((data) => {
      this.username = data.firstName;
    });
  }

  onHandleLogout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/auth/login');
  }
}
