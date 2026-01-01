import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]'
})
export class HideIfClaimsNotMetDirective implements OnInit{
  @Input("appHideIfClaimsNotMet") claimReq! : Function;


  constructor(private authService : AuthService,
    private elementRef : ElementRef
  ) { }
  ngOnInit(): void {
    const claims = this.authService.getClaims();
    if(!this.claimReq(claims)){
      this.elementRef.nativeElement.style.display = "none";
    }
  }

}
