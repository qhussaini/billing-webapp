import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { OrderService } from '../order/order.service';
// import { generatedata } from './../../../sampledata/generatedata';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  data: OrderService = new OrderService;
  constructor() { }

  ngOnInit() {
  }
// source: any =
//     {
//         localdata: this.data.receiptsData,
//         datatype: 'array',
//         datafields:
//         [
//             { name: 'billno.', type: 'string' },
//             { name: 'date', type: 'string' },
//             { name: 'amount', type: 'string' },
//             { name: 'discount', type: 'string' },
//             { name: 'tax', type: 'string' },
//             { name: 'orderType', type: 'string' },
//             { name: 'payment', type: 'string' },
//             { name: 'customer', type: 'string' },
//             { name: 'status', type: 'string' },
//             { name: 'employeeID', type: 'string' }
//         ]
//     };
	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}

		return 850;
	}
    dataAdapter = new jqx.dataAdapter({localData: this.data.receiptsData});
    columns: any[] =
    [
        { text: 'Bill No.', datafield: 'billno', width: 130 },
        { text: 'Date', datafield: 'date', width: 130 },
        { text: 'Amount', datafield: 'amount', width: 130 },
        { text: 'Discount', datafield: 'discount', width: 130 },
        { text: 'Tax', datafield: 'tax', width: 130 },
        { text: 'Order Type', datafield: 'orderType', width: 130 },
        { text: 'Payment', datafield: 'payment', width: 120, align: 'right', cellsalign: 'right', cellsformat: 'd' },
        { text: 'Customer', datafield: 'customer', width: 120, align: 'right', cellsalign: 'right', cellsformat: 'd' },
        { text: 'Status', datafield: 'status', width: 100, align: 'right', cellsalign: 'right' },
        { text: 'Employee ID', datafield: 'employeeID', cellsalign: 'right', align: 'right', cellsformat: 'c2' }
    ];
    excelBtnOnClick() {
        this.myGrid.exportdata('xls', 'jqxGrid');
    };
    xmlBtnOnClick() {
        this.myGrid.exportdata('xml', 'jqxGrid');
    };
    csvBtnOnClick() {
        this.myGrid.exportdata('csv', 'jqxGrid');
    };
    tsvBtnOnClick() {
        this.myGrid.exportdata('tsv', 'jqxGrid');
    };
    htmlBtnOnClick() {
        this.myGrid.exportdata('html', 'jqxGrid');
    };
    jsonBtnOnClick() {
        this.myGrid.exportdata('json', 'jqxGrid');
    };
    pdfBtnOnClick() {
        this.myGrid.exportdata('pdf', 'jqxGrid');
    };
}
