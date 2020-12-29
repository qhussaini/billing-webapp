import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
@Component({
  selector: "sa-barcodescanner",
  templateUrl: "./barcodescanner.component.html",
  styleUrls: ["./barcodescanner.component.scss"],
})
export class BarcodescannerComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
    console.log(" :: barValue :: " + this.barcodeValue);
  }

  onStarted(event) {
    console.log("value", event);
  }
}
