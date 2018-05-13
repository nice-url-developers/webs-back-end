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
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {AppComponent} from './app.component';
// import {  } from 'ng-zorro-antd';
import {NzDemoTableAjaxComponent} from './url/url.list';
import { NzUrlListHeaderComponent} from './url/url.list.header.date';
import {NzUrlFormHorizontalComponent} from './url/url.add';
@NgModule({
  declarations: [
    AppComponent,
    NzDemoTableAjaxComponent,
    NzUrlListHeaderComponent,
    NzUrlFormHorizontalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
