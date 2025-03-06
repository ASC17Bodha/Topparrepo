import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
 
  loginForm:FormGroup;
  submitted=false;
  constructor(private router:Router, private formbuilder:FormBuilder){}
 
  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
 
  onSubmit(){
    this.submitted=true
    console.log(this.loginForm.value);
    const username:string=this.loginForm.get("username").value;
    const password:string=this.loginForm.get("password").value;
 
    if(username==="nits" && password==="nits"){
        console.log("login sucess");
        sessionStorage.setItem("loggedIn","yes");
        this.router.navigate(["/Issues"]);
 
    }else{
        console.log("login failed");
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    if(username==="nits" && password==="nits"){
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
  }else{
      Toast.fire({
          icon: "error",
          title: "Login Unsuccessfull!!! Try again"
        });
  }
 
}
 
  }
 
 