import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vendor } from '../../Models/vendor.model';
import { VendorService } from '../../Shared/Service/vendor.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store-owner',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './store-owner.component.html',
  styleUrls: ['./store-owner.component.css']
})
export class StoreOwnerComponent implements OnInit {
  vendors: Vendor[] = [];
  isLoading = false;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.isLoading = true;
    this.vendorService.getMyVendors().subscribe({
      next: (vendors: Vendor[]) => {
        this.vendors = vendors;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
