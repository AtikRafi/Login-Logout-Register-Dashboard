// src/app/Shared/Service/vendor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../../Models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'https://localhost:7100/api/VendorOwner/me/vendors'; // replace with your API

  constructor(private http: HttpClient) {}

  // ✅ Add this method
  getMyVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}`);
  }
}
