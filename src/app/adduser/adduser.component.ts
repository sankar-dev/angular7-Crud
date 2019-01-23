import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  registerForm: FormGroup;
  submitted = false;
  baseUrl: string = 'http://localhost:3000/user';
  message: any;
  private subject = new Subject<any>();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router
  , private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.subject.subscribe((data) => {
      console.log("Subscriber 1 got data >>>>> " + data);
      this.toastr.success(data, 'User Creation!', {
        timeOut: 3000
      });
    });
    
  }
 
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.toastr.warning('Please enter valid information!', 'User Creation!', {
        timeOut: 3000
      });
      return;
    }
   
    this.http.post(this.baseUrl, this.registerForm.value).subscribe(
      res => {
        console.log(res);
        this.subject.next('New User Added');
        this.registerForm.reset();
        this.router.navigate(['user']);
      },
      err => {
        console.log("Error occured");
        this.toastr.error('Something went wrong!', 'User Creation!', {
          timeOut: 3000
        });
      }
    );
              
    //alert(JSON.stringify(this.registerForm.value));
    //console.log(JSON.stringify(this.registerForm.value));
  }

 

  listUser(): void {
    this.router.navigate(['user']);
  };
}
