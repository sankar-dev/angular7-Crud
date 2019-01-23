import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListuserComponent } from "./listuser/listuser.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { EdituserComponent } from "./edituser/edituser.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: 'adduser', component: AdduserComponent },
  { path: 'user', component: ListuserComponent },
  { path: 'edituser', component: EdituserComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
