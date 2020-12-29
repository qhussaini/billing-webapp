import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { OrderService } from "../order/order.service";
@Component({
  selector: "sa-barcodescanner",
  templateUrl: "./barcodescanner.component.html",
  styleUrls: ["./barcodescanner.component.scss"],
})
export class BarcodescannerComponent implements AfterViewInit {
  constructor(public orderService: OrderService) {}

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
    if (this.orderService.barcodeValue !== result.codeResult.code) {
      this.orderService.barcodeValue = result.codeResult.code;
      this.orderService.scannerValue();
    }
    setInterval(() => {
      this.orderService.barcodeValue = 0;
    }, 5500);
    console.log(" :: barValue :: " + this.barcodeValue);
  }

  onStarted(event) {
    console.log("value", event);
  }
}
