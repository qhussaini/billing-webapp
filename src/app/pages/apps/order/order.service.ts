import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class OrderService {
  testVal = [];
  constructor() { }
  products = [
    { src: 'https://images-na.ssl-images-amazon.com/images/I/81d%2B4M0aFjL._SL1500_.jpg', ICode: 'ptb', IName: 'Skippy Peanut Butter', GName: 'dairy', vendor: 'Skippy', pPrice: 5, IUnit: 80, sPrice: 6.5, shelf: 1.1, hold: false, holdColor:'accent', holdName:'Hold Product', holdIcon:'pan_tool' },
    { src: '../../../../assets/images/products/Nutella-HazelnutSpread.jpg', ICode: 'nhs', IName: 'Nutella Hazelnut Spread', GName: 'Food', vendor: 'Nutella', pPrice: 9, IUnit: 70, sPrice: 10.5, shelf: 1.2, hold: false, holdColor:'accent', holdName:'Hold Product', holdIcon:'pan_tool' },
    { src: '../../../../assets/images/products/EATAnytime-MixedDryFruit.jpg', ICode: 'mdf', IName: 'EAT Anytime Mixed Dry Fruit', GName: 'nuts', vendor: 'EAT Anytime', pPrice: 10, IUnit: 150, sPrice: 12, shelf: 1.3, hold: false, holdColor:'accent', holdName:'Hold Product', holdIcon:'pan_tool' },
    { src: '../../../../assets/images/products/sandisk-MicroSd128g.jpg', ICode: 'smsd', IName: 'sandisk Micro Sd 128g', GName: 'mobile accessories', vendor: 'sandisk', pPrice: 150, IUnit: 200, sPrice: 159, shelf: 2.1, hold: false, holdColor:'accent', holdName:'Hold Product', holdIcon:'pan_tool' },
    { src: '../../../../assets/images/products/Sony-WF-1000XM3.jpg', ICode: 'beb', IName: 'Sony WF-1000XM3', GName: 'mobile accessories', vendor: 'Sony', pPrice: 199, IUnit: 50, sPrice: 210, shelf: 2.2, hold: false, holdColor:'accent', holdName:'Hold Product', holdIcon:'pan_tool' },
  ]
  productDataColumns = [
    { text: 'Id', datafield: 'ICode' },
    { text: 'Name', datafield: 'IName' },
    { text: 'Group Name', datafield: 'GName' },
    { text: 'Vendor', datafield: 'vendor' },
    { text: 'Purchase Price', datafield: 'pPrice' },
    { text: 'Unit', datafield: 'IUnit' },
    { text: 'Sale Price', datafield: 'sPrice' },
    { text: 'Shelf', datafield: 'shelf' },
  ];

  selection = ['Mobile Phone', 'Groceries', 'Mobile Accessories', 'Home Appliances', 'Snacks']

  bill = [];

  receiptsData = [
    {billno: 5001, date:'22-11-20', amount:'$70.0', discount:'2%', tax:'6.2%', orderType:'online', payment:'card', customer:'anwaar', status:'close', employeeID:'54856'},
    {billno: 5002, date:'23-11-20', amount:'$85.0', discount:'2%', tax:'6%', orderType:'online', payment:'UPI', customer:'syed', status:'close', employeeID:'54856'},
    {billno: 5003, date:'29-10-20', amount:'$51.0', discount:'1.7%', tax:'6%', orderType:'offline', payment:'cash', customer:'malik', status:'close', employeeID:'59601'},
    {billno: 5004, date:'02-11-20', amount:'$51.0', discount:'1.7%', tax:'6%', orderType:'offline', payment:'cash', customer:'hussaini', status:'active', employeeID:'57343'},
    {billno: 5005, date:'10-11-20', amount:'$66.0', discount:'1.7%', tax:'6%', orderType:'offline', payment:'cash', customer:'qayyum', status:'active', employeeID:'57413'},
    {billno: 5006, date:'11-11-20', amount:'$74.3', discount:'1.7%', tax:'6%', orderType:'offline', payment:'cash', customer:'shafeeq', status:'active', employeeID:'57517'},
  ]

  customerData = [
    { srno: 1, fname: 'syed', lname: 'quyyum', mobile: '9822222222', email: 'quyyum@demo.com' },
    { srno: 2, fname: 'anwaar', lname: 'hussaini', mobile: '9855555555', email: 'ans.data@demo.com' },
    { srno: 3, fname: 'demo', lname: 'abrar', mobile: '9844444444', email: 'syed.da@demo.com' },
    { srno: 4, fname: 'Syed', lname: 'furkhan', mobile: '9833333333', email: 'syedhus@demo.com' },
    { srno: 5, fname: 'quyyum', lname: 'anwaar', mobile: '9878888888', email: 'anwaar@demo.com' },
    { srno: 6, fname: 'saas', lname: 'malik', mobile: '9866666666', email: 'saas@demo.com' },
    { srno: 7, fname: 'hussaini', lname: 'demo', mobile: '9877777777', email: 'saasemail@demo.com' },
    { srno: 8, fname: 'Syed', lname: 'furkhan', mobile: '9833333333', email: 'syedhus@demo.com' },
    { srno: 9, fname: 'saas', lname: 'malik', mobile: '9866666666', email: 'saas@demo.com' },
    { srno: 10, fname: 'demo', lname: 'abrar', mobile: '9844444444', email: 'syed.da@demo.com' },
    { srno: 11, fname: 'hussaini', lname: 'demo', mobile: '9877777777', email: 'saasemail@demo.com' },
    { srno: 12, fname: 'anwaar', lname: 'hussaini', mobile: '9855555555', email: 'ans.data@demo.com' },
  ]
}
export interface Customer {
  srno: number;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
}
export interface Product {
    src: string;
    ICode: string;
    IName: string;
    GName: string;
    vendor: string;
    pPrice: number;
    IUnit: number;
    sPrice: number;
    shelf: number;
}
