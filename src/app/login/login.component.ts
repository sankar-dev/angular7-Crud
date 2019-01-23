import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  authUrl: string = 'http://localhost:3000/auth/login';
  accessToken: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.http.post(this.authUrl, this.loginForm.value).subscribe(
      res => {
        
        localStorage.removeItem("MyAPPAccessToken");
        for (var k in res) {
          this.accessToken = res[k];
          localStorage.setItem("MyAPPAccessToken", res[k]);
        }
        this.router.navigate(['user']);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
