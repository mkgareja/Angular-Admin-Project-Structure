import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';
import { Constants } from 'src/app/routes/api-routes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  updateProfileForm: FormGroup;
  adminDetails: any;

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private httpService: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9\s]{10,13}$/)
      ]),
      oldPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      newPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(30)
      ])
    });
    this.getProfile();
  }

  async getProfile() {
    try {
      this.utilityService.showLoading();
      this.adminDetails = await this.httpService.get(
        `${Constants.adminRoutes.adminProfile}`
      );
      this.updateProfileForm.patchValue({
        firstName: this.adminDetails[0].firstName,
        lastName: this.adminDetails[0].lastName,
        email: this.adminDetails[0].email,
        phone: this.adminDetails[0].mobile
      });
      this.utilityService.hideLoading();
    } catch (err) {
      this.utilityService.hideLoading();
    }
  }

  async onSubmit() {
    if (this.updateProfileForm.dirty && this.updateProfileForm.valid) {
      const editProfile = this.updateProfileForm.getRawValue();

      if (this.updateProfileForm.value.oldPassword) {
        if (!this.updateProfileForm.value.newPassword) {
          this.utilityService.showErrorToast(
            this.utilityService.getString('newPassword')
          );
        } else {
          if (
            this.updateProfileForm.value.newPassword !==
            this.updateProfileForm.value.confirmPassword
          ) {
            this.utilityService.showErrorToast(
              this.utilityService.getString('confirmPassword')
            );
          } else {
            const updatedData = {
              firstName: editProfile.firstName,
              lastName: editProfile.lastName,
              mobile: editProfile.phone.toString(),
              oldPassword: editProfile.oldPassword,
              newPassword: editProfile.newPassword
            };
            this.updateProfile(updatedData);
          }
        }
      } else {
        const updatedData = {
          firstName: editProfile.firstName,
          lastName: editProfile.lastName,
          mobile: editProfile.phone.toString()
        };
        this.updateProfile(updatedData);
      }
    }
  }

  async updateProfile(updatedData) {
    try {
      this.utilityService.showLoading();
      const updateMember: any = await this.httpService.post(
        `${Constants.adminRoutes.adminUpdateProfile}`,
        updatedData
      );
      this.router.navigate([[Constants.adminRoutes.adminHome]]);
      this.utilityService.showSuccessToast(updateMember.msg);
      this.utilityService.hideLoading();
    } catch (err) {
      this.utilityService.hideLoading();
    }
  }
}
