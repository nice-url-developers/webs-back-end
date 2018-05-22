import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl, AbstractControl, ValidatorFn
} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UrlRecord} from './url';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

enableProdMode();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class RandomUserService {

  // randomUserUrl = 'http://140.143.242.232:8080/urlrecord/';
  randomUserUrl = 'http://127.0.0.1:8080/urlrecord/';

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  add(hero: UrlRecord): Observable<UrlRecord> {
    return this.http.post<UrlRecord>(this.randomUserUrl, hero, httpOptions)
      .pipe(
      );
  }

  constructor(private http: HttpClient) {
  }
}


@Component({
  selector: 'nz-url-form-horizontal',
  templateUrl: './url.add.html',
  providers: [RandomUserService],
  styles: []
})
export class NzUrlFormHorizontalComponent implements OnInit {
  urlText = '';
  urlIcon = this.urlText + '/favicon.ico';
  validateForm: FormGroup;
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    {label: 'HTTP', value: 'http://', checked: true},
    {label: 'HTTPS', value: 'https://', checked: false},
  ];

  constructor(private fb: FormBuilder, private heroesService: RandomUserService) {
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        // name = name.trim();
        // if (!name) { return; }

        // The server will generate the id for this new hero
      }
    }
    const urlRecord: UrlRecord = this.validateForm.value as UrlRecord;
    this.heroesService.add(urlRecord)
      .subscribe(hero => console.log(hero));
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      url: [null, [Validators.required]],
      name: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      type: [null, [Validators.required]],
      space: [null, [Validators.required]],
      isOpenAll: [null, [Validators.required]],
      agree: [null, [Validators.required]],
      ccc: [null, [Validators.required]],
      ccca: [null, [Validators.required]],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked() {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  getString(s) {
    return JSON.stringify(s);
  }

  onUrlKey(event: any) {
    console.log( this.getDomain(event.target.value));
    this.urlIcon = event.target.value + '/favicon.ico';
  }

  getDomain(weburl) {
    const urlReg = /http(.*):\/\/([^\/]+)/i;
    const wr = weburl.match(urlReg);
    return ((wr != null && wr.length > 0) ? wr[0] : '');
  }
}
