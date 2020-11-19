import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
// import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var require: any;
@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }

  translation = require('../../assets/i18n/en.json');

  getString(key) {
    return this.translation[key];
  }

  /**
   * sortData(sort, itemList, fieldsName) => sort data base on sort field option
   * @param sort in sort object
   * @param itemList in item list
   * @param fieldsName in fields list
   */
  sortData(sort: Sort, itemList: any[], fieldsName: string[]) {
    const data = itemList.slice();
    const fieldName: string = fieldsName[sort.active];
    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[fieldName], b[fieldName], isAsc);
    });
  }

  /**
   * compare(a, b, isAsc) => compare value base on sort wise
   * @param a in a value
   * @param b in b valua
   * @param isAsc in ascending & decending
   */
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /// TODO: Below all function is used in future so when we use that time we un comment and use
  log(message: any, values?: any) {
    if (!environment.production) {
      console.log(message, values);
    }
  }

  setLocalStore(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearStorageFor(key) {
    return localStorage.removeItem(key);
  }

  clearStorage() {
    return localStorage.clear();
  }

  showLoading() {
    this.spinner.show();
  }

  hideLoading() {
    this.spinner.hide();
  }

  showSuccessToast(msg) {
    this.toastr.success(msg);
  }

  showErrorToast(msg) {
    this.toastr.error(msg);
  }

  showInfoToast(msg) {
    this.toastr.info(msg);
  }

  showAlert(error) {
    this.showInfoToast(error);
    // const alert = this.alertCtrl.create({
    //   message: error,
    //   title: "Alert",
    //   buttons: ['Ok']
    // });
    // alert.present();
  }

  downloadCsvOrXlsx(data, type, name) {
    let extension = '';
    let url = '';
    const ws = XLSX.utils.json_to_sheet(data);
    if (type === 'csv') {
      const blobData = XLSX.utils.sheet_to_csv(ws, {
        FS: ';',
      });
      url = window.URL.createObjectURL(new Blob([blobData]));
      extension = 'csv';
    } else {
      const workbook: XLSX.WorkBook = { Sheets: { orders: ws }, SheetNames: ['orders'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      url = window.URL.createObjectURL(blob);
      extension = 'xlsx';
    }
    const fileName = `${name}.${extension}`;
    this.downloadFile(url, fileName);
  }

  downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  }

  download(url, downloadName) {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = downloadName;
    a.click();
    document.body.removeChild(a);
  }

  onPageChanged(perPage, currentPage, eventPage) {
    if (perPage !== 0) {
      if (currentPage !== eventPage) {
        currentPage = eventPage;
      }
      return { perPage, currentPage };
    }
  }

  onPageSet(perPage, currentPage, isReset) {
    if (isReset) {
      currentPage = 1;
    }
    const perPageData = perPage;
    return { perPageData, currentPage, isReset };
  }

}
