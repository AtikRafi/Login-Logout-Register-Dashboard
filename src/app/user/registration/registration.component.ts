import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FirstKeyPipe } from '../../Shared/pipes/first-key.pipe';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true, // standalone component
  imports: [ReactiveFormsModule, NgIf, NgSwitch, NgSwitchCase, FirstKeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  isSubmit : boolean =false;
  constructor(private fb: FormBuilder,
    private service : AuthService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  //password mismatch
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    this.isSubmit=true;
    if (this.form.valid) {
     this.service.createUser(this.form.value).subscribe({
      next:(res:any)=>{
        if(res.succeeded){
          this.form.reset();
          this.isSubmit=false;
          this.toastr.success('New User Created!', 'Registration Successful')
        }
      
        
      },
      error:err=>{
        if(err.error.errors)
          err.error.errors.forEach((x:any) => {
            switch(x.code){
              case "DuplicateUserName":
                break;

                case "DuplicateEmail":
                  this.toastr.error('Email is already Taken','Registration Failed')
                break;

                default:
                  this.toastr.error('Contact Developer','Registration Failed')
                  console.log(x)
                  break;

            }
          })
          else
            console.log('error:', err);
      }
      
     })
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  //error
  hasDisplayError(controlName: string){
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmit || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
