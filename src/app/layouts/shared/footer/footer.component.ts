import { Component, OnInit } from "@angular/core";
import { TopBar } from "../topbar/topbar.model";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(public topBar: TopBar) {}
  year: number = new Date().getFullYear();

  ngOnInit() {}
}
