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
  constructor(private dialog:NgbModal) { }

  ngOnInit() {
  }

  open(content, inputType , hintName) {
    this.inputType = inputType;
    this.inputHint =hintName;
    if(this.inputType=='Table'){
      this.tablePopup(content)
    }else if(this.inputType=='Item'){
     this.itemPopup(content)
    }
    
  }
  itemPopup(content){
    this.dialog.open(content).result.then((result) => {
      this.itemValue = `Item: ${result}`;
    }, (reason) => {
      this.itemValue = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  tablePopup(content){
    this.dialog.open(content).result.then((result) => {
      this.tableValue = `Table: ${result}`;
    }, (reason) => {
      this.tableValue = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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
