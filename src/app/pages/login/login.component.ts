import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { UtilityService } from 'src/app/services/utility.service';
// import { Message } from '../shared/models/messages';
import { Constants } from '../../../app/routes/api-routes';
// import { AdminService } from '../admin.service';
import { HttpRequestsService } from '../../services/http-requests.service';
// import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isRefresh: boolean;
  public loginParam: FormGroup;
  constructor(
    private fb: FormBuilder,
    public httpService: HttpRequestsService,
    public helper: UtilityService,
    // public shared: SharedService,
    private router: Router) {
    this.isRefresh = false;
    this.loginParam = this.fb.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', [Validators.maxLength(30), Validators.required]],
      admin: true
    });
  }

  /**
   * login(data, isValid) => check login credentials with api call @login
   * @param data in form control field value
   * @param isValid in form validation done or not
   */
  login(data, isValid) {
    if (isValid) {
      this.helper.showLoading();
      localStorage.clear();
      this.httpService.post(`${Constants.signInRoutes.signin}`, data, true).then(jResponse => {
          this.helper.setLocalStore('token', jResponse['token']);
          // this.shared.updateProfile();
          this.helper.hideLoading();
          this.router.navigate(['/admin/home']);
        }).catch(() => {
          this.helper.hideLoading();
        });
    } else if (String(data.userName).length === 0) {
      // this.helper.showErrorToast(Message.txtUserName);
    } else if (this.loginParam.controls.userName.errors) {
      // this.helper.showErrorToast(Message.txtEmailValid);
    } else if (!this.loginParam.controls.password.valid) {
      // this.helper.showErrorToast(Message.txtPassword);
    } else {
      // this.helper.showErrorToast(Message.txtCredentials);
    }
  }

}
