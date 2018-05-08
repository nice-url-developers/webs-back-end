import {Component, ElementRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {b} from '@angular/core/src/render3';

@Component({
  selector: 'nz-datepicker-disable-date',
  templateUrl: './url.list.header.html',
  styles  : [
    `.editable-tag ::ng-deep .ant-tag {
      background: rgb(255, 255, 255);
      border-style: dashed;
    }`,
    ``
  ]
})
export class NzDemoDatePickerDisableDateComponent {
  _date = null;
  _moment = null;
  _dateRange = [null, null];
  value: string;
  isSpecial = false;
  _tags = [ 'Unremovable', 'Tag 2', 'Tag 3' ];



  panels = [
    {
      active: false,
      disabled: false,
      name: 'add',
      customStyle: {
        'background': '#fff',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    }
  ];
  taggleBox(): void {
    this.isSpecial = !this.isSpecial;
  }
}





