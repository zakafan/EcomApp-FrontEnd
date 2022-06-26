import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public categories:any;
  public currentCategorie:any;

  constructor(private catService:CatalogueService, private router:Router){}

  ngOnInit(): void {
    this.getCategories();

  }
  getCategories() {
     this.catService.getResource("/categories")
     .subscribe(data=>{
      this.categories=data;
     },err=>{
      console.log(err);
     })
  }

  getProductsByCat(c:any){
    this.currentCategorie=c;
    this.router.navigateByUrl('/products/2/'+c.id);

  }

  onSelectedProducts(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0");

  }
  
}
