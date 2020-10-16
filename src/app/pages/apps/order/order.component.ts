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
  // customerForm = new FormGroup ({
  //   customerData: new FormArray([])
  // });


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
  addNew(fName: HTMLInputElement, lName: HTMLInputElement, mobile: HTMLInputElement, email: HTMLInputElement ){
    if(!fName.value && !lName.value && !mobile.value && !email.value){
      this.showError()
    }else{
      this.customerData.push({srno:'',fname:fName.value, lname:lName.value, mobile: mobile.value, email: email.value});
      fName.value = '';
      lName.value = '';
      mobile.value = '';
      email.value = '';
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
  customerData = [
    {srno:'1', fname: 'syed', lname: 'quyyum', mobile: '9822222222', email: 'quyyum@demo.com'},
    {srno:'2', fname: 'anwaar', lname: 'hussaini', mobile: '9855555555', email: 'ans.data@demo.com'},
    {srno:'3', fname: 'demo', lname: 'abrar', mobile: '9844444444', email: 'syed.da@demo.com'},
    {srno:'4', fname: 'Syed', lname: 'furkhan', mobile: '9833333333', email: 'syedhus@demo.com'},
    {srno:'5', fname: 'quyyum', lname: 'anwaar', mobile: '9878888888', email: 'anwaar@demo.com'},
    {srno:'6', fname: 'saas', lname: 'malik', mobile: '9866666666', email: 'saas@demo.com'},
    {srno:'7', fname: 'hussaini', lname: 'demo', mobile: '9877777777', email: 'saasemail@demo.com'},
    {srno:'8', fname: 'Syed', lname: 'furkhan', mobile: '9833333333', email: 'syedhus@demo.com'},
    {srno:'9', fname: 'saas', lname: 'malik', mobile: '9866666666', email: 'saas@demo.com'},
    {srno:'10', fname: 'demo', lname: 'abrar', mobile: '9844444444', email: 'syed.da@demo.com'},
    {srno:'11', fname: 'hussaini', lname: 'demo', mobile: '9877777777', email: 'saasemail@demo.com'},
    {srno:'12', fname: 'anwaar', lname: 'hussaini', mobile: '9855555555', email: 'ans.data@demo.com'},
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
