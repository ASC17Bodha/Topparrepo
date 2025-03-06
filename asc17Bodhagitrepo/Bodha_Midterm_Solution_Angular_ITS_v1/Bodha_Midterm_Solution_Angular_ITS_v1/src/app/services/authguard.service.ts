import { Injectable, InjectionToken } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn:"root"
})
export class AuthGuardService implements CanActivate{
    constructor(private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(sessionStorage.getItem('loggedIn')=='yes'){
        return true;        
    }
    else{
        this.router.navigate(['/Login']);
        return false;
    }
    }
}