import { AuthService } from './../../shared/services/auth.service';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ 
    FormsModule,
    ReactiveFormsModule, 
    NgIf, 
    NgClass, 
    HttpClientModule, 
    AlertComponent
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asub: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form =  new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(  (params: Params) => {
      if (params['registered']) {
        this.form.value['userName'] = params['userName']
        this.form.value['password'] = params['password']
        MaterialService.toast('Now you can Sign In');
      }
      if (params['accessDenied']) {
        MaterialService.toast('You should Sign In for get access to this resouse');
      }
      if (params['sessionFailed']) {
        MaterialService.toast('You should Sign In for get access to this resouse');
      }
    })
  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe();
    }
  }
  onSubmit() {
    this.form.disable();
    this.asub = this.authService.login(this.form.value).subscribe(
      data => {
        this.router.navigate(['/books'])
      },
      error => {
        MaterialService.toast(error['error']['message']);
        this.form.enable();
      }
    );
  }
}
