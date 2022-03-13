import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services';
import { Profile } from '../../core/models';

interface Profile {
  fullname: string;
  firstName: string;
  surName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  nationality: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Profile = {
    fullname: '',
    firstName: '',
    surName: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    gender: '',
    nationality: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.userService.currentUser.subscribe((data) => {
      this.user = {
        fullname: data.fullname,
        firstName: data.firstName,
        surName: data.surName,
        address: data.address,
        emailAddress: data.emailAddress,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        nationality: data.nationality
      };
    });
  }
}
