import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../Shared/Service/auth.service';
import { HideIfClaimsNotMetDirective } from '../../Shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../../Shared/utils/claimReq-utils';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref,HideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(private service : AuthService, private router : Router){}

  claimReq = claimReq

  Onlogout() {
    this.service.deleteToken();
    this.router.navigateByUrl('/signin')
  }
}
