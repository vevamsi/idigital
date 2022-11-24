import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  fg:FormGroup;
  list:any[]
  constructor(private api:ApiService,
    private fb:FormBuilder,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.createForm()
    this.loadData()
  }
  deleteCat(id:number){
    this.api.deletecategory(id).subscribe({
      next:resp=>{
        this.toast.success('Category deleted successfully')
        this.loadData()
      },
      error:err=>this.toast.error('Cannot delete category')
    })
  }

  loadData(){
    this.api.listcategories().subscribe({
      next:
        resp=>this.list=resp,
      error:err=>console.log(err.error)
    })
  }

  createForm(){
    this.fg=this.fb.group({
      'catname':['',Validators.required],
    })
  }

  savecategory(values:any){
    console.log(values)
   // if(this.fg.valid){
    this.api.savecategory(values).subscribe({
      next:resp=>{
        this.toast.success('Category Updated')
        this.loadData()
        this.fg.reset()
      },
      error:err=>this.toast.error('Please enter the Category name')
    })
  //}else{
      //this.toast.error('Please fill all required information')
 // }
}
}

