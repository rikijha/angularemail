import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import{map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
    providedIn:'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService:AuthService){}
    
    validate=(control:FormControl)=>{
        const {value}=control
        return this.authService.usernameAvailabe(value).pipe(
            map(()=>{
                return null;
            }),
            catchError((err)=>{
                if(err.error.username){
                return of({ nonUniqueUsername:true })
                }else{
                    return of({ noConnection:true })
                }
            })
        )
    }
    

}
