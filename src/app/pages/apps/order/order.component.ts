import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private dialog:NgbModal) { }

  ngOnInit() {
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
    {itemType: 'Chicken', itema: '', itemb: '', itemc: '', itemd: '', iteme: ''}, 
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
