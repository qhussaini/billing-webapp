import { AfterContentInit, Directive, ElementRef, Input } from "@angular/core";
import { OrderService } from "./order.service";

@Directive({
  selector: "[appAutofocus]",
})
export class AutofocusDirective implements AfterContentInit {
  @Input() public autoFocus: boolean;
  constructor(private el: ElementRef, private orderService: OrderService) {}
  ngAfterContentInit(): void {
    // if (this.orderService.customerDialog) {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 1500);
    // }
  }
}
