import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResData } from './auth.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   isLoginMode = true;

   signupForm: FormGroup ;
   loginForm: FormGroup ;
   token:string;
   error:string=null;
   success:string=null;
   

   constructor(private authService:AuthService,private router:Router){}

   ngOnInit(){

    this.signupForm = new FormGroup({
 
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,Validators.required),
      'name': new FormControl(null,Validators.required),
      'passwords': new FormGroup({
        'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'confirmpassword': new FormControl(null,Validators.required),
      },this.passwordCheck)
    });

    this.loginForm = new FormGroup({
      'username':new FormControl(null,[Validators.required,Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
    })
   }

   onSwitch(){
    this.isLoginMode = !this.isLoginMode;
   }

   onSignup(){
      console.log(this.signupForm)

      this.authService.signup({
        'username':this.signupForm.get('username').value,
        'email':this.signupForm.get('email').value,
        'name':this.signupForm.get('name').value,
        'password':this.signupForm.get('passwords.password').value
      
      }).subscribe({
    
        next: (data:AuthResData) => {
          this.isLoginMode = true;
          this.success="Sign Up successful";
          this.error = null;
        },
        error: (errorRes) => console.error(errorRes),
        complete: () => console.info('complete') 
    })
   }

   onLogin(){
    console.log(this.loginForm)
    const val = this.loginForm.value;
    console.log(val);
        if (val.username && val.password) {
            this.authService.Login(this.loginForm.value)
            .subscribe({
              next: (data:AuthResData) => console.log(1),
              complete: () =>  this.router.navigateByUrl('/profile'),
              error: (errorRes) => this.error = errorRes
          
          })
          this.loginForm.reset()
             
        }

 }


   passwordCheck(control:FormGroup):  {[s:string]:boolean}{
    if(control.get('password').value != control.get('confirmpassword').value){
         return {'notsame':true}
    }
    return null;
   }


}
