import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  form!: FormGroup
  isSubmit: boolean = false

  constructor(public formbuilder: FormBuilder,
    private serivce: AuthService,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    if(this.serivce.isLoggedIn())
      this.router.navigateByUrl('/dashboard')
  }

  OnSubmit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.serivce.signIn(this.form.value).subscribe({
        next: (res: any) => {
          console.log('login',res)
          this.serivce.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error:(err:any)=>{
          if(err.status == 400)
            this.toastr.error('Incorrect email or password.','Log In Failed')
          else
            console.log('error During Log in : \n', err)
        }
      })
    }
    
  }

  hasDisplayError(controlName: string) {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmit || Boolean(control?.touched)) || Boolean(control?.dirty)
  }
}
