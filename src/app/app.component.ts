import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService, UserService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  constructor(
    private userService: UserService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    if (!this.jwtService.getToken()) {
      this.router.navigateByUrl('/auth/login');
    }
    this.userService.populate();
  }

  ngOnChanges(): void {
    if (this.jwtService.getToken()) {
      this.router.navigateByUrl('/');
    }
  }
}
