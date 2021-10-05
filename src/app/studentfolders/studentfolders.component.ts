import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentfolders',
  templateUrl: './studentfolders.component.html',
  styleUrls: ['./studentfolders.component.css']
})
export class StudentfoldersComponent implements OnInit {
mail:any=sessionStorage.getItem('mail')
  constructor(private router:Router,private http:HttpClient) { 
   
  }

  ngOnInit(): void {
  }

  logout(){
    
    localStorage.clear();
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

}
