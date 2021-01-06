import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { jqxValidatorComponent } from "jqwidgets-ng/jqxvalidator";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";
import { OrderService, Product } from "../order/order.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  @ViewChild("myValidator", { static: false })
  myValidator: jqxValidatorComponent;
  pass: string;
  filterSearch: Observable<Product[]>;
  searchControl = new FormControl();
  private _searchTerm: string;
  filteredSearch: Product[] = this.orderService.products;
  constructor(
    private dialog: NgbModal,
    public topBar: TopBar,
    private toastr: ToastrService,
    public orderService: OrderService
  ) {
    this.filterSearch = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((IName) => (IName ? this._filter(IName) : this.products.slice()))
    );
  }
  searchProductFn(subject) {
    return subject ? subject.IName : undefined;
  }
  private _filter(IName: string): Product[] {
    const filterValue = IName.toLowerCase();

    return this.orderService.products.filter(
      (option) => option.IName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredSearch = this.filterProductSearch(value);
  }
  filterProductSearch(searchString: string) {
    return this.orderService.products.filter(
      (product) =>
        product.IName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  }

  products = this.orderService.products;
  selection = this.orderService.selection;
  itemImg = "";
  itemName: any;
  itemCode: any;
  itemType: any;
  itemVendor: any;
  itempPrice;
  itemUnit;
  itemsPrice;
  itemShelf;
  itemId;
  selectItem: boolean = false;

  ngOnInit() {}
  // rules = [
  //   {
  //     input: ".image-sa",
  //     message: "ImageURL is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".name-sa",
  //     message: "Peoduct Name is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".icode-sa",
  //     message: "Peoduct Code is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".gname-sa",
  //     message: "Peoduct Group is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".vender-sa",
  //     message: "Peoduct Vender is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".sprice-sa",
  //     message: "Sale Price is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".pprice-sa",
  //     message: "Your Price is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".unit-sa",
  //     message: "Unit is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  //   {
  //     input: ".shelf-sa",
  //     message: "Shelf is required!",
  //     action: "keyup, blur",
  //     rule: "required",
  //   },
  // ];

  openItem(content) {
    this.dialog.open(content, { size: "lg" });
  }
  openbar(content) {
    this.dialog.open(content);
  }
  holdProduct(item) {
    let hItem = this.orderService.products.indexOf(item);
    if (!this.orderService.products[hItem].hold) {
      this.orderService.products[hItem].holdColor = "primary";
      this.orderService.products[hItem].holdName = "Release";
      this.orderService.products[hItem].holdIcon = "motion_photos_on";
      this.orderService.products[hItem].hold = true;
      this.showInfo("The product " + item.IName + " is on hold");
    } else {
      this.orderService.products[hItem].holdColor = "accent";
      this.orderService.products[hItem].holdName = "Hold Product";
      this.orderService.products[hItem].holdIcon = "pan_tool";
      this.orderService.products[hItem].hold = false;
      this.showInfo("The product " + item.IName + " is unhold");
    }
    // console.log(this.orderService.products[hItem].hold);
  }
  deleteItem(item) {
    this.products.splice(item.no - 1, 1);
    this.showError(item.IName + " is Deleted", "Alart");
  }

  sortTab() {
    this.products.sort();
  }
  clearProduct(content) {
    this.dialog
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.pass = `${result}`;
          if (this.pass == "1234") {
            this.products = [];
            this.showInfo("All products is Deleted");
          } else {
            this.showError(
              "your not allowed to delete recode",
              "! Restriction !"
            );
          }
        },
        (reason) => {
          this.pass = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  showError(error: string, titel) {
    this.toastr.error(error, titel, {
      timeOut: 1800,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }
  showInfo(info: string) {
    this.toastr.info(info, "Alart", {
      timeOut: 1800,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }
  showToastr(success: string) {
    this.toastr.success(success, "Product Added", {
      timeOut: 1800,
      progressBar: true,
      progressAnimation: "increasing",
      tapToDismiss: true,
      closeButton: true,
    });
  }

  getEditItem(product, content) {
    this.openItem(content);
    this.itemId = this.orderService.products.indexOf(product);
    this.itemImg = product.src;
    this.itemCode = product.ICode;
    this.itemName = product.IName;
    this.itemType = product.GName;
    this.itemVendor = product.vendor;
    this.itempPrice = product.pPrice;
    this.itemsPrice = product.sPrice;
    this.itemUnit = product.IUnit;
    this.itemShelf = product.shelf;
  }
  updateItem(image, pprice, unit, sprice, shelf) {
    if (
      !image.value &&
      !sprice.value &&
      !pprice.value &&
      !unit.value &&
      !shelf.value
    ) {
      this.showError("Product Field/Fields are empty", "Error");
    }
    // } else if (pprice.value > sprice.value) {
    //   // console.log(pprice.value +" <PP|  |sp> "+ sprice.value)
    //   this.showError("The Selling price is less than Purchase Price",'Error');
    // }
    else {
      this.orderService.products[this.itemId].src = image.value;
      this.orderService.products[this.itemId].IUnit = unit.value;
      this.orderService.products[this.itemId].pPrice = pprice.value;
      this.orderService.products[this.itemId].sPrice = sprice.value;
      this.orderService.products[this.itemId].shelf = shelf.value;
      this.showToastr("Product is successfully Updated");
      this.dialog.dismissAll();
    }
  }
  addItem(image, icode, iname, gname, vendor, pprice, unit, sprice, shelf) {
    if (
      !image.value &&
      !icode.value &&
      !sprice.value &&
      !iname.value &&
      !gname.value &&
      !vendor.value &&
      !pprice.value &&
      !unit.value &&
      !shelf.value
    ) {
      this.showError("Product Field/Fields are empty", "Error");
    } else if (gname.value === "Select Category *") {
      this.showError("Product Category are empty", "Error");
    } else {
      this.orderService.products.push({
        src: image.value,
        ICode: icode.value,
        IName: iname.value,
        Category: gname.value,
        vendor: vendor.value,
        pPrice: pprice.value,
        IUnit: unit.value,
        sPrice: sprice.value,
        shelf: shelf.value,
        hold: false,
        holdName: "Hold Product",
        holdColor: "accent",
        holdIcon: "pan_tool",
        Available: true,
      });
      // console.log(gname.value);
      image.value = "";
      icode.value = "";
      iname.value = "";
      gname.value = "Select Category *";
      vendor.value = "";
      pprice.value = "";
      this.orderService.barcodeValue = undefined;
      unit.value = "";
      sprice.value = "";
      shelf.value = "";
      this.showToastr("Product is successfully added to the inventory");
    }
  }
}
