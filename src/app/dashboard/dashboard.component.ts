import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../Shared/Service/auth.service';
import { UserService } from '../Shared/Service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,
    private service: AuthService,
    private userService: UserService
  ) { }
  fullName: string = ''
  email: string = ''

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.fullName = res.fullName,
          this.email = res.email
      },
      error: (err: any) => { console.log('error while retriving user profile : \n', err) }
    })


  }

  
}
