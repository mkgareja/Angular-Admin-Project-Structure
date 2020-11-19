import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestsService } from '../../services/http-requests.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  cmsType = null;
  cmsContent;
  cmsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpRequestsService,
    private utilityService: UtilityService
  ) {
    this.route.params.subscribe(param => {
      this.cmsType = param.type;
      this.getCmsData(this.cmsType);
    });
  }

  ngOnInit(): void {
    this.cmsForm = new FormGroup({
      cmsContent: new FormControl()
    });
  }

  async getCmsData(type) {
    try {
      this.utilityService.showLoading();
      const cmsData = await this.httpService.get(`/${type}`);
      this.cmsContent = cmsData[0].content;
      this.utilityService.hideLoading();
    } catch (err) {
      this.utilityService.hideLoading();
    }
  }

  async updateCmsData() {
    try {
      this.utilityService.showLoading();
      const updatedData = {
        content: this.cmsForm.get('cmsContent').value
      };
      const aboutUs: any = await this.httpService.post(
        `/${this.cmsType}`,
        updatedData
      );
      this.utilityService.showSuccessToast(aboutUs.msg);

      this.utilityService.hideLoading();
    } catch (err) {
      this.utilityService.hideLoading();
    }
  }

}
