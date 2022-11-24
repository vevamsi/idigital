import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASEURL:string="http://localhost:8080/api/";
  cartDataList:any=[]
  cartItemCount=new BehaviorSubject(0)
  userRole=new BehaviorSubject('G')
  constructor(private http:HttpClient) { }

  getRole(){
    return sessionStorage.getItem('role') || 'G'
  }

  validate(data:any){
    return this.http.post<any>(this.BASEURL+"customers/validate",data);
  }

  validateadmin(data:any){
    return this.http.post<any>(this.BASEURL+"admin/validate",data);
  }

  dashboard(){
    return this.http.get<any>(this.BASEURL+"admin/dashboard");
  }

  //categories
  savecategory(data:any){
    return this.http.post<any>(this.BASEURL+"categories",data);
  }

  listcategories(){
    return this.http.get<any[]>(this.BASEURL+"categories");
  }

  deletecategory(id:number){
    return this.http.delete<any>(this.BASEURL+"categories/"+id)
  }

  //customer
  register(data:any){
    return this.http.post<any>(this.BASEURL+"customers",data);
  }

  listcustomers(){
    return this.http.get<any[]>(this.BASEURL+"customers")
  }
  
  getcustomerdetails(id:any){
    return this.http.get<any>(this.BASEURL+"customers/"+id)
  }
  searchcustomers(search:string){
    return this.http.get<any[]>(this.BASEURL+"customers?search="+search)
  }

  //products
  saveproduct(data:any){
    //new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(this.BASEURL+"plants",data)
  }

  updateproduct(id:string,data:any){
    return this.http.put<any>(this.BASEURL+"plants/"+id,data)
  }

  listproducts(){
    return this.http.get<any[]>(this.BASEURL+"plants")
  }
  
  catproducts(catid:number){
    return this.http.get<any[]>(this.BASEURL+"plants/cats/"+catid)
  }

  searchproducts(search:string){
    return this.http.get<any[]>(this.BASEURL+"plants?search="+search)
  }

  deleteproduct(id:number){
    return this.http.delete<any>(this.BASEURL+"plants/"+id)
  }

  updatecartCount(id:any){
    this.getcart(id).subscribe({
      next:resp=>
      {
        const count=resp.length || 0
        this.cartItemCount.next(count)
      },
      error:err=>console.log(err.error)
    })
  }

  getCartCount(){
    return this.cartItemCount
  }

  //cart
  addtocart(data:any){
    return this.http.post<any>(this.BASEURL+"cart",data)
  }

  getcart(id:any){
    return this.http.get<any[]>(this.BASEURL+"cart?custid="+id)
  }

  deletefromcart(id:any){
    return this.http.delete<any>(this.BASEURL+"cart/"+id)
  }

  updateqty(prodid:string,qty:number){
    return this.http.put<any>(this.BASEURL+"cart/"+prodid,{qty:qty});
  }

  //orders
  placeorder(data:any){
    return this.http.post<any>(this.BASEURL+"orders",data);
  }

  orderhistory(custid:any){
    return this.http.get<any[]>(this.BASEURL+"orders?custid="+custid);
  }

  allorders(){
    return this.http.get<any[]>(this.BASEURL+"orders");
  }
}
