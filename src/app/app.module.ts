// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
//
// import { AppComponent } from './app.component';
//
// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {AppComponent} from './app.component';
// import {  } from 'ng-zorro-antd';
import {NzDemoTableAjaxComponent} from './url/url.list';
import {NzDemoDatePickerDisableDateComponent} from './url/url.list.header.date';
@NgModule({
  declarations: [
    AppComponent,
    NzDemoTableAjaxComponent,
    NzDemoDatePickerDisableDateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
