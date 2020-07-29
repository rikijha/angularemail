import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials{
  username:string,
  password:string,
  passwordConfirmation:string
}

interface SigninCredentials{
  username:string,
  password:string
}



interface SignupResponse{
  username:string
}

interface SignedinResponse{
  authenticated:boolean
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl='https://api.angular-email.com';
  signedin$=new BehaviorSubject<boolean>(null);
  username='';

  constructor(private http:HttpClient) { }

  usernameAvailabe(username:string){
    return this.http.post<{available:boolean}>(this.rootUrl+'/auth/username',{
            username
        });
  }


  signup(credentials:SignupCredentials){
    return this.http.post<SignupResponse>(this.rootUrl+'/auth/signup',credentials)
        .pipe(tap(({username})=>{
          this.username=username;
          this.signedin$.next(true);
        }))
  }

  checkAuth(){
    return this.http.get<SignedinResponse>(this.rootUrl+'/auth/signedin').pipe(
      tap(({authenticated,username})=>{
        this.username=username;
        this.signedin$.next(authenticated)
      })
    )
  }

  signout(){
    return this.http.post(this.rootUrl+'/auth/signout',{}).pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials:SigninCredentials){
    return this.http.post<SignedinResponse>(this.rootUrl+'/auth/signin',credentials).pipe(
      tap(({username})=>{
        this.username=username;
        this.signedin$.next(true);
      })
    )
  }
}
