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
  fname = '';
  lname = '';
  cMobile = '';
  cEmail='';
  iCode='';
  iName='';
  gName='';
  iVendor='';
  pPrice='';
  iUnit='';
  sPrice='';
  iShelf='';
  subMenu: true;
  getUser= [];
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

  refreshPage(){
    window.location.reload();
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
  getValue(customer){
    this.fname = customer.fname;
    this.lname = customer.lname;
    this.cMobile = customer.mobile;
    this.cEmail = customer.email;
  }
  // details= [
  //   {no: '#', product:'', qty:'', price:'', code:''}
  // ]
  dproduct='';
  dcode='';
  dqty='';
  dprice='';
  getDetails(item){ 
    this.dproduct = item.product;
    this.dqty = item.qty;
    this.dprice = item.price; 
    this.dcode = item.code;
  }

  cancelBill(){
  }
  billing= [
    {no: '1', product:'book', qty:'1', price:'2.5', code:'bk5'},
    {no: '2', product:'7Up', qty:'2', price:'1.5', code:'7up'},
    {no: '3', product:'peanut butter', qty:'1', price:'3.5', code:'ptb'},
    {no: '4', product:'pen', qty:'1', price:'0.5', code:'ppn'},
    {no: '5', product:'dates', qty:'1', price:'5', code:'dats7'}
  ]
 
  deleteTable(table: FormControl){
    let index = this.tables.controls.indexOf(table);
    this.tables.removeAt(index);
  }
  get tables(){
    return this.form.get('tables') as FormArray;
  }

  open(content) {
    this.dialog.open(content, { size: 'lg' }).result.then((result) => {
      this.tableValue = `Table: ${result}`;
    }, (reason) => {
      this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  openItem(content) {
    this.dialog.open(content, { size: 'xl' });
  }

  getItemD(product){
    this.iCode = product.ICode;
    this.iName = product.IName;
    this.gName = product.GName;
    this.iVendor = product.vendor;
    this.pPrice = product.pPrice;
    this.iUnit = product.IUnit;
    this.sPrice = product.sPrice;
    this.iShelf = product.shelf;
  }

  addItem(icode,iname,gname,vendor,pprice,unit,sprice,shelf){
    if(!icode.value && !iname.value && !gname.value && !vendor.value && !pprice.value && !unit.value && !shelf.value){
      this.showError();
    }else{
    this.products.push({
      ICode:icode.value, 
      IName:iname.value,
      GName:gname.value,
      vendor:vendor.value, 
      pPrice:pprice.value,
      IUnit:unit.value,
      sPrice:sprice.value,
      shelf:shelf.value
    });
    this.showToastr();
  }
  }

  products= [
    {ICode:'ptb', IName:'Skippy Peanut Butter',GName:'dairy',vendor:'Skippy', pPrice:'5',IUnit:'80',sPrice:'6.5', shelf:'1.1'},
    {ICode:'nhs', IName:'Nutella Hazelnut Spread',GName:'Food',vendor:'Nutella', pPrice:'9',IUnit:'70',sPrice:'10.5', shelf:'1.2'},
    {ICode:'mdf', IName:'Mixed Dry Fruit',GName:'nuts',vendor:'EAT Anytime', pPrice:'10',IUnit:'150',sPrice:'12', shelf:'1.3'},
    {ICode:'smsd', IName:'sandisk Micro Sd 128g',GName:'mobile accessories',vendor:'sandisk', pPrice:'150',IUnit:'200',sPrice:'159', shelf:'2.1'},
    {ICode:'beb', IName:'Sony WF-1000XM3',GName:'',vendor:'Sony', pPrice:'199',IUnit:'50',sPrice:'210', shelf:'2.2'},
  ]

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
