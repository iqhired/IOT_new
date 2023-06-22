import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError,tap, throwError } from "rxjs";
import { singupModel, AuthResData,loginModel, User } from "./auth.model";
import { Router } from "@angular/router";


@Injectable({providedIn:'root'})
export class AuthService{
   user = new BehaviorSubject<User>(null);
    constructor(private http:HttpClient,private router:Router){}

    signup(home:singupModel){
        return this.http.post<AuthResData>('http://127.0.0.1:8000/api/home/signup/',home)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    Login(home:loginModel){
        return this.http.post<AuthResData>('http://127.0.0.1:8000/api/home/login/',home)
        .pipe(catchError(this.handleError),tap((res)=>{
           this.handleAuth(res);
        }))
    }

    autoLogin(){
        const userData:AuthResData = JSON.parse(localStorage.getItem('user'))
        if(!userData){
            return;
        }
        const LoadedUser = new User(userData.user_id,userData.email,userData.username,userData.name,userData.token)
        this.user.next(LoadedUser)
        return;
    }

    private handleError(error:HttpErrorResponse){
        console.log(error)
        let errormessage = 'An unknown error occured'
        if(!error.error){
            return throwError(errormessage);
        }
        if(error.error.non_field_errors){
            errormessage = error.error.non_field_errors[0]
        }
        if(error.error.username){
            errormessage = error.error.username[0]
        }
        return throwError(errormessage);
       
    }

    private handleAuth(res: AuthResData){
        const user = new User(res.user_id,res.email,res.username,res.name,res.token);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user))
    }
    logout(){
        this.user.next(null)
        localStorage.removeItem('user');
        this.router.navigate(['/auth'])
    }
}