import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  baseUrl = "https://localhost:7100/api"

  createUser(formData: any){
    return this.http.post(this.baseUrl + "/signUp", formData);
  }
  
  signIn(formdata :any){
    return this.http.post(this.baseUrl+ "/signIn",formdata )
  }
}
