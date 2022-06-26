import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:any;
  public editImg: boolean = false;
  public currentProduct: any;
  public selectedFiles:any;
  public progress:number | undefined;
  currentFileUpload: any;
  currentTime: number =0;
  public title:string | undefined;
  constructor(
    public catService:CatalogueService,
    public route:ActivatedRoute, private router:Router
    ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd ) {
        let url = val.url;
    
    let p1=this.route.snapshot.params['p1'];
    if(p1==1){
      this.title="Selected Products";
        this.getProducts('/products/search/selectedProducts');
    }
    else if (p1==2){
      let idCat=this.route.snapshot.params['p2'];
      this.title="Produits de la categorie"+idCat;
      
      this.getProducts('/categories/'+idCat+'/products');}
      else if (p1==3){
        this.title="Recherche.."
        this.getProducts('products/search')

      }

  }});
}
  getProducts(url:any) {
    this.catService.getResource(url)
    .subscribe(data=>{
      this.products=data;

    },err=>{
      console.log(err);
    }
    )
  }
  onEditImg(p:any){
    this.currentProduct=p;
    this.editImg=true;

  }
  onSelectedFile(event:any){
    this.onSelectedFile=event.target.files;

  }

  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {  
          const total: number = event.total;  
          this.progress = Math.round(100 * event.loaded / total);    
      }   
      else {  
          //handle illegal state  
      }  
        
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.getProducts('/products/search/selectedProducts');
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

}
