import {Component, ElementRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {b} from '@angular/core/src/render3';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'nz-datepicker-disable-date',
  templateUrl: './url.list.header.html',
  styles: [
      `.editable-tag ::ng-deep .ant-tag {
      background: rgb(255, 255, 255);
      border-style: dashed;
    }`,
      `#box {
      overflow: hidden;
      margin: 0px 0px 5px;
      border-radius: 5px;
      border: 1px solid #fff;
    }

    #box div {
      overflow: hidden;
      padding: 5px;
    }`
  ],
  animations: [
    trigger('boxState', [
      state('inactive', style({height: 0})),
      state('active', style({height: '*', border: '1px solid #108ee9'})),
      state('void', style({height: '*',  border: '1px solid #fff'})),
      transition('inactive => active',
        [
          group([
            animate('0.3s ease-in', style({
              // width: 10
              height: '*'
            })),
            animate('0.3s 0.2s ease', style({
              border: '1px solid #108ee9'
            }))
          ])
        ]),
      transition('active => inactive', [
        group([
          animate('0.3s ease-out', style({
            // width: 10
            height: '0'
          })),
          animate('0.3s 0.2s ease', style({
            border: '1px solid #fff'
          }))
        ])
      ]),
    ]),
  ]
})
export class NzUrlListHeaderComponent {
  _date = null;
  _moment = null;
  _dateRange = [null, null];
  value: string;
  isSpecial = false;
  Boxstate = 'inactive';
  _tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  selectedIndex = 0;
  tabs = [
    {
      name    : '常规',
      disabled: false,
    },
    {
      name    : '高级搜索',
      disabled: false
    }
  ];

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
    this.isSpecial = this.isSpecial === false ? true : false;
    this.Boxstate = this.Boxstate === 'active' ? 'inactive' : 'active';
  }
}





