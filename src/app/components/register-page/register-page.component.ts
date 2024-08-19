import { AuthService } from './../../shared/services/auth.service';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asub: Subscription;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.asub = this.authService.register(this.form.value).subscribe(
      data => {
        console.log('login succes');
        console.log(data);
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
            userName: this.form.value['userName'],
            password: this.form.value['password'],
          }
        })
      },
      error => {
        MaterialService.toast(error['error']['message']);
        this.form.enable();
      }
    );
  }
}
