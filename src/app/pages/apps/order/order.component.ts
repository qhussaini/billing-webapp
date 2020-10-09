import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  tableValue = '';
  itemValue = '';
  inputType = '';
  inputHint = '';
  subItem = '';
  subMenu: true;
  form = new FormGroup ({
    tables: new FormArray([])
  });


  constructor(private dialog:NgbModal, private toastr:ToastrService) { }

  ngOnInit() {
  }
  showError(){
    this.toastr.error('Table Field is empty', 'Error', {
      timeOut: 1800,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
      closeButton:true
    });
  }


  showToastr(){
    this.toastr.success('Table added successfully', 'Added', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
      closeButton:true
    });
  }
  addTable(table: HTMLInputElement){
    if(!table.value){
      this.showError()
    }else{
      this.tables.push(new FormControl(table.value));
      table.value = '';
      this.showToastr()
    }
  }
 
  deleteTable(table: FormControl){
    let index = this.tables.controls.indexOf(table);
    this.tables.removeAt(index);
  }
  get tables(){
    return this.form.get('tables') as FormArray;
  }

  open(content, inputType , hintName) {
    this.inputType = inputType;
    this.inputHint =hintName;
    if(this.inputType=='Table'){
      this.dialog.open(content).result.then((result) => {
        this.tableValue = `Table: ${result}`;
      }, (reason) => {
        this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else if(this.inputType=='Item'){
      this.dialog.open(content).result.then((result) => {
        this.itemValue = `Item: ${result}`;
      }, (reason) => {
        this.itemValue = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else if(this.inputType=='Menu'){
        this.dialog.open(content).result.then((result) => {
          this.subItem = `${result}`;
        }, (reason) => {
          this.subItem = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
  }
  tableData= [
    {itemType: 'Chicken', itema: '1chicken', itemb: '2chicken', itemc: '3chicken', itemd: '4chicken', iteme: '5chicken'}, 
    {itemType: 'Fish',},
    {itemType: 'beef',},
    {itemType: 'Mutton',}, 
    {itemType: 'Egg' }
  ]
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
