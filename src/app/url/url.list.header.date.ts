import {Component, ElementRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {b} from '@angular/core/src/render3';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    }
    #box div {
      overflow: hidden;
      padding: 5px;
    }`
  ],
  animations: [
    trigger('heroState', [
      state('inactive', style({height : 0})),
      state('active', style({height : '*'})),
      state('void', style({height : '*' })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out')),
    /*  /!*非激活进场*!/
      transition('void => inactive', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100)
      ]),
      /!*非激活离场*!/
      transition('inactive => void', [
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      /!*激活进场*!/
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(200)
      ]),
      /!*激活离场*!/
      transition('active => void', [
        style({height : 0}),
        animate(200, style({height : 100}))
      ])*/
    ])
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
    this.Boxstate = this.Boxstate === 'active' ? 'inactive' : 'active';
  }
}





