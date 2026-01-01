import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { TOKEN_Key } from '../constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  createUser(formData: any) {
    formData.role = "StoreOwner"
    formData.gender = "Male"
    formData.age =35
    return this.http.post(environment.apiBaseUrl + "/signUp", formData);
  }

  signIn(formdata: any) {
    return this.http.post(environment.apiBaseUrl + "/signIn", formdata)
  }


  isLoggedIn() {
    return this.getToken() != null ? true : false
  }

  saveToken(token:string){
    localStorage.setItem(TOKEN_Key,token)
  }

  getToken(){
   return localStorage.getItem(TOKEN_Key);
  }

  deleteToken(){
    localStorage.removeItem(TOKEN_Key);
  }

  getClaims(){
   return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
  }
}
