import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from './utility.service';
// import { Message } from '../pages/shared/models/messages';

export class JReponse {
  message: string;
  data: any;
  success: boolean;
  code: number;
}

@Injectable()
export class APIService {

  API_URL: string;

  constructor(
    public http: HttpClient,
    public config: UtilityService) {
    this.API_URL = environment.APP_URL + '';
  }

  /**
   * post(URL, data) => http post method without header 
   * @param URL in api routing url after 'http://18.218.209.117/api/v1'
   * @param data in api request param
   */
  post(URL, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + URL, data).subscribe(res => {
        this.config.log('inside ', res);
        if (res['success']) {
          resolve(res);
        } else {
          this.config.showAlert(res['message']);
          reject(res);
        }
      }, (err) => {
        reject(this.getErrorResponse(err));
      });
    });
  }

  /**
   * getWithHeader(URL, xAuthToken) => http get method with header 
   * @param URL in api routing url after 'http://18.218.209.117/api/v1'
   * @param xAuthToken in logged user token
   */
  getWithHeader(URL, xAuthToken) {
    return new Promise((resolve, reject) => {
      let headerParams = {};
      if (URL.includes("admin/user/export") == true) {
        headerParams = { headers: { 'authorization': xAuthToken }, responseType: 'text' }
      } else {
        headerParams = { headers: { 'authorization': xAuthToken } }
      }

      this.http.get(this.API_URL + URL, headerParams).subscribe(res => {
        this.config.log('inside ', res);
        resolve(res);
      }, (err) => {
        reject(this.getErrorResponse(err));
      });
    });
  }

  /**
   * postWithHeader(URL, data, xAuthToken) => http post method with header
   * @param URL in api routing url after 'http://18.218.209.117/api/v1'
   * @param data in api request param
   * @param xAuthToken in logged user token
   */
  postWithHeader(URL, data, xAuthToken) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + URL, data, { headers: { 'authorization': xAuthToken } }).subscribe(res => {
        this.config.log('inside ', res);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(this.getErrorResponse(err));
      });
    });
  }

  /**
   * deleteWithHeader(URL, xAuthToken) => http delete method with header
   * @param URL in api routing url after 'http://18.218.209.117/api/v1'
   * @param xAuthToken in logged user token
   */
  deleteWithHeader(URL, xAuthToken) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.API_URL + URL, { headers: { 'authorization': xAuthToken } }).subscribe(res => {
        this.config.log('inside ', res);
        resolve(res);
      }, (err) => {
        reject(this.getErrorResponse(err));
      });
    });
  }

  /**
   * getErrorResponse(err, showAlert?, showToast?) => get error and return error message
   * @param err in error
   * @param showAlert in 
   * @param showToast 
   */
  getErrorResponse(err, showAlert?: boolean, showToast?: boolean) {
    let error: JReponse = new JReponse;
    if (err && (err.status === 0 || err.status === 500 || err.status === 504)) {
      // error.message = Message.txtServerDown;
      if (!showToast)
        // this.config.showErrorToast(Message.txtServerDown);
        return;
    } else if (err && err.status === 401) {
      error = err.error;
      this.config.showErrorToast((error.message ? error.message : error));
    } else {
      error = err.error;
      if (showAlert)
        this.config.showErrorToast((error.message ? error.message : error));
      else if (!showToast)
        this.config.showErrorToast((error.message ? error.message : error));
    }
    error.code = err.status;
    return error;
  }

}
