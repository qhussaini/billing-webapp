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
    this.dialog.open(content, { size: 'xl' }).result.then((result) => {
      this.tableValue = `Table: ${result}`;
    }, (reason) => {
      this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  selectTable(table: FormControl){
    let index = this.tables.controls.indexOf(table);
    this.toastr.info('order for table '+this.tables[index], 'order', {
      timeOut: 1300,
    });
  }
  tableData= [
    {itemType: 'Chicken', itema: '1chicken', itemb: '2chicken', itemc: '3chicken', itemd: '4chicken', iteme: '5chicken'}, 
    {itemType: 'Fish',  itema: '1Fish', itemb: '2Fish', itemc: '3Fish', itemd: '4Fish', iteme: '5Fish'},
    {itemType: 'beef',  itema: '1Beef', itemb: '2Beef', itemc: '3Beef', itemd: '4Beef', iteme: '5Beef'},
    {itemType: 'Mutton',  itema: '1mutton', itemb: '2mutton', itemc: '3mutton', itemd: '4mutton', iteme: '5mutton'}, 
    {itemType: 'Egg' ,  itema: '1Egg', itemb: '2Egg', itemc: '3Egg', itemd: '4Egg', iteme: '5Egg'}
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
