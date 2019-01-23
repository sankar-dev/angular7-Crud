import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  users: any;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  baseUrl: string = 'http://localhost:3000/user';
  ngOnInit() {
    this.http.get(this.baseUrl).subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  addUser(): void {
    this.router.navigate(['adduser']);
  };

  editUser(user: any): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edituser']);
  };

  deleteUser(user: any): void {
    let userId = user.id.toString();
    this.http.delete(this.baseUrl + '/' + userId).subscribe(
      res => {
        this.users = this.users.filter(u => u !== user);
        this.toastr.info('User deleted successfully', 'User Delete!', {
          timeOut: 3000
        });
      },
      err => {
        console.log("Error occured");
      }
    );
  };

}
