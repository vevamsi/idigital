import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  total:number=0;
  list:any[]
  count:number=0
  custid=sessionStorage.getItem('id')
  fg:FormGroup
  constructor(private api:ApiService,private toast:ToastrService,
    private route:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadData()
    this.createForm()
  }

  createForm(){
    this.fg= this.fb.group({
      'nameoncard':['',Validators.required],
      'cardno':['',Validators.required],
      'amount':['',Validators.required],
      'customerid':[sessionStorage.getItem('id'),Validators.required],
    })
  }

  removefromcart(id:any){
    const custid=sessionStorage.getItem('id')
    this.api.deletefromcart(id).subscribe({
      next:resp=>{
        this.toast.success('Item deleted from cart')
        this.loadData()
        this.api.updatecartCount(custid)
      }
    })
  }

  placeorder(values:any){
    console.log(values)
    if(this.fg.valid){
    const custid=sessionStorage.getItem('id')
    this.api.placeorder(values).subscribe({
      next:resp=>{  
        this.api.updatecartCount(custid)      
        this.toast.success('Order placed successfully')
        this.route.navigate(['/history'])
      },
      error:err=>this.toast.error('Incorrect Payment Credentials')
    })
  }else{
    this.toast.error('Please fill all required information')
  }
  }

  updateqty(id:string,qty:number){
    const custid=sessionStorage.getItem('id')
    if(qty==0)
      this.toast.error('Cannot reduce quantity')
    else{
      this.api.updateqty(id,qty).subscribe({
        next:resp=>{
          this.toast.success('Quantity updated')
          this.loadData()
        },
        error:err=>console.log("error")
      });
    }
  }

  loadData(){
    this.api.getcart(sessionStorage.getItem('id')).subscribe({
      next:resp=>{
        this.list=resp
        this.count=resp.length || 0
        this.total=resp.reduce((sum:number,x:any)=>sum+x.qty*x.product.price,0)
        this.fg.patchValue({'amount':this.total})
      }
    })
  }

}
