import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class RandomUserService {
  randomUserUrl = 'http://127.0.0.1:8080/urlrecord/';

  // randomUserUrl = 'http://140.143.242.232:8080/urlrecord/';
  getUsers(pageIndex = 1, pageSize = 10, sortField, sortOrder, genders, search) {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('name', `${search}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params: params
    });
  }

  del(hero: UrlRecord): Observable<UrlRecord> {
    return this.http.put<UrlRecord>(`${this.randomUserUrl + 'del'}`, hero, httpOptions)
      .pipe(
      );
  }

  constructor(private http: HttpClient) {
  }
}

import {Component, OnInit} from '@angular/core';
import {a, d, d} from '@angular/core/src/render3';
import {UrlRecord} from './url';
import {Observable} from 'rxjs';

@Component({
  selector: 'url-all-list',
  providers: [RandomUserService],
  template: `
    <nz-datepicker-disable-date>
    </nz-datepicker-disable-date>
    <nz-table #nzTable
              [nzAjaxData]="_dataSet"
              nzShowSizeChanger
              [nzLoading]="_loading"
              [nzTotal]="_total"
              [(nzPageIndex)]="_current"
              (nzPageIndexChange)="refreshData()"
              [(nzPageSize)]="_pageSize"
              (nzPageSizeChange)="refreshData(true)">
      <thead nz-thead>
      <tr>
        <th nz-th>
          <span>ID</span>
          <nz-table-sort (nzValueChange)="sort('id',$event)"></nz-table-sort>
        </th>
        <th nz-th>
          <span>Name</span>
          <nz-table-sort (nzValueChange)="sort('name',$event)"></nz-table-sort>
        </th>
        <th nz-th>
          <span>Gender</span>
          <nz-dropdown [nzTrigger]="'click'">
            <i class="anticon anticon-filter" nz-dropdown></i>
            <ul nz-menu>
              <li nz-menu-item *ngFor="let filter of _filterGender">
                <label nz-checkbox [(ngModel)]="filter.value">
                  <span>{{filter.name}}</span>
                </label>
              </li>
            </ul>
            <div nz-table-filter>
              <span nz-table-filter-confirm (click)="refreshData(true)">OK</span>
              <span nz-table-filter-clear (click)="reset()">Reset</span>
            </div>
          </nz-dropdown>
        </th>
        <th nz-th><span>URL</span></th>
        <th nz-th><span>操作</span></th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let data of nzTable.data">
        <td nz-td>
          <a>{{data.id}}</a>
        </td>
        <td nz-td>
          <a>{{data.name}}</a>
        </td>
        <td nz-td>{{data.type}}</td>
        <td nz-td><a href="http://{{data.url}}" target="_blank">{{data.url}}</a></td>
        <td nz-td>
          <button class="icon-delete" title="删除此项" (click)="delData(data)">删除</button>
          <a (click)="delData(data)">复制</a>
        </td>
      </tr>
      </tbody>
    </nz-table>`,
  styles: []
})
export class NzDemoTableAjaxComponent implements OnInit {
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;
  _sortField = null;
  _sortValue = null;
  _search = '';
  _filterGender = [
    {name: 'male', value: false},
    {name: 'female', value: false}
  ];

  sort(name, value) {
    this._sortField = name;
    this._sortValue = value;
    this.refreshData();
  }

  reset() {
    this._filterGender.forEach(item => {
      item.value = false;
    });
    this.refreshData(true);
  }

  constructor(private _randomUser: RandomUserService) {
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    const selectedGender = this._filterGender.filter(item => item.value).map(item => item.name);
    this._randomUser.getUsers(this._current, this._pageSize, this._sortField, this._sortValue, selectedGender, this._search)
      .subscribe((result: any) => {
        this._loading = false;
        this._total = result.total;
        this._dataSet = result.data;
      });
  }

  delData(data) {
    console.log(data);
    this._dataSet = this._dataSet.filter(h => h !== data);
    this._randomUser.del(data).subscribe((result: any) => {
      if (result.code === 200) {
        console.log(result);
      }
    });
  }

  ngOnInit() {
    this.refreshData();
  }
}

