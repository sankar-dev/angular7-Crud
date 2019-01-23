import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private http: HttpClient, private toastr: ToastrService) { }
  editForm: FormGroup;
  user: any;
  baseUrl: string = 'http://localhost:3000/user';
 
  private subject = new Subject<any>();
  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['user']);
      return;
    }


    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  
    this.http.get<any>(this.baseUrl + '/' + userId).subscribe( data => {
      this.editForm.patchValue(data);
    });

    this.subject.subscribe((data) => {
      console.log("Subscriber 1 got data >>>>> " + data);
      this.toastr.success(data, 'User Creation!', {
        timeOut: 3000
      });
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.toastr.warning('Please enter valid information!', 'User Update!', {
        timeOut: 3000
      });
      return;
    }
    let userId = localStorage.getItem("editUserId");
    this.http.put(this.baseUrl + '/' + userId, this.editForm.value).subscribe(
      res => {
        this.subject.next('User Updated Successfully');
        this.router.navigate(['user']);
      },
      err => {
        console.log("Error occured");
      }
    );
              
  }




}
