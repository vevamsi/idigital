import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cats:any[]
  cartitem:number=0;
  wishitem:number=0;
  search:string
  role:string='G'
  constructor(private _router:Router,private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.role=this.api.getRole()
    console.log("role",this.role) 
    const custid=sessionStorage.getItem('id')
    if(custid!=null){ 
      this.api.getcustomerdetails(sessionStorage.getItem('id'))
      .subscribe({
        next:resp=>{
          const uinfo=resp.data
          this.api.updatecartCount(custid)
        }
      })
    }

    this.api.listcategories().subscribe({
      next:resp=>this.cats=resp,
      error:err=>console.log(err.error)
    })
    
    this.route.queryParams.subscribe(p=>this.search=p['search'])
  }

  loadCartAndWishlistData(){           
        this.api.getCartCount().subscribe(res=>{
          this.cartitem=res
          console.log(res)
        })                  
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/'])
  }

}
