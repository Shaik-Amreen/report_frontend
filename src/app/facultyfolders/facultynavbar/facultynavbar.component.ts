import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facultynavbar',
  templateUrl: './facultynavbar.component.html',
  styleUrls: ['./facultynavbar.component.css']
})
export class FacultynavbarComponent implements OnInit {

  navMode=true;

  constructor(private http:HttpClient,private router:Router) {
    if(sessionStorage.getItem('role')!='faculty'){this.router.navigate(['/'])}
    
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
