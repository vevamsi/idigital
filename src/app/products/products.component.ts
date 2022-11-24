import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { NgxPaginationModule } from 'ngx-pagination/public-api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  fg:FormGroup;
  model:any={}
  cats:any[]
  list:any[]
  edit:boolean=false
  filePath="../assets/upload.png"
  image:any
  submitted=false;
  upload=false;
  role=sessionStorage.getItem('role')
  p: number= 1;
  constructor(private api:ApiService,
    private fb:FormBuilder,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.createForm()
    this.loadData()
  }

  loadData(){
    const vid=sessionStorage.getItem('id')
    this.api.listcategories().subscribe({
      next:resp=>this.cats=resp
    })
      this.api.listproducts().subscribe({
        next:resp=>{
          this.list=resp;
        }
      })
  }

  createForm(){
     this.fg=this.fb.group({
      'pname':['',Validators.required],
      'category':['',Validators.required],
      'descr':['',Validators.required],
      'price':['',Validators.required],
      'pic':['',Validators.required],
      'id':[null],      
    })
  }

  saveFile(e:any){
    const ele=(e.target as HTMLInputElement)
    const file=ele.files?.item(0)
    console.log(file)
    this.image=file
    this.upload=true;
    const reader=new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload=()=>{
      this.filePath=reader.result as string
      //this.fg.patchValue({pic:reader.result})
    }
  }

  get f(){
    return this.fg.controls
  }

  editProduct(item:any){
      this.fg=this.fb.group({
       'pname':[item.pname],
       'category':[item.category.id],
       'descr':[item.descr],
       'price':[item.price],
       'pic':[item.pic],
       'id':[item.id],      
     })
     this.edit=true
  }

  deleteProduct(id:number){
    this.api.deleteproduct(id).subscribe({
      next:resp=>{
        this.toast.success('Product deleted')
        this.loadData()
      },
      error:err=>this.toast.error('Product cannot delete')
    })
  }

  saveproduct(f:any){  
    this.submitted=true;
    console.log(f)
    if(!this.edit){
      this.fg.get('id').setValue(null)
    }
    if(!this.edit && this.fg.valid && this.upload){
      console.log("Valid",this.fg.valid)
      let fd=new FormData()      
      console.log(f)
      for(let ele in this.fg.value){
        console.log(ele)
        fd.append(ele,(<any>this.fg.get(ele).value))
      }
      fd.append("pic",this.image) 
      this.api.saveproduct(fd).subscribe({
        next:resp=>{              
        this.toast.success("Product saved successfully")      
        this.fg.reset()
        this.submitted=false;
        this.loadData()
        },
        error:err=>console.log(err.error)
      });
    }
    else if(this.edit){
      let fd=new FormData()      
      console.log(f)
      for(let ele in this.fg.value){
        console.log(ele)
        fd.append(ele,(<any>this.fg.get(ele).value))
      }
      if(this.image){
        fd.append("pic",this.image)    
      }
      this.api.updateproduct(this.fg.get('id').value,fd).subscribe({
        next:resp=>{              
        this.toast.success("Product updated successfully")      
        this.fg.reset()
        this.submitted=false;
        this.loadData()
        },
        error:err=>console.log(err.error)
      });
    }
    this.edit=false
  }
key : string ="id"
reverse: boolean=false;
sort(key:any){
  this.key=key;
  this.reverse=!this.reverse;
 }
}
