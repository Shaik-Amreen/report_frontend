import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navMode=true;

  constructor(private http:HttpClient,private router:Router) {
   if(sessionStorage.getItem('role')!='admin'){this.router.navigate(['/'])}
    
   }
   
  ngOnInit(): void {
  }


  logout(){
    sessionStorage.removeItem('mail');
    localStorage.clear();
    this.router.navigate(['/'])
  }
  

  changeNav(){
    this.navMode=!this.navMode
  }

}
