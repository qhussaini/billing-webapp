import { Component, OnInit, Input } from "@angular/core";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";

@Component({
  selector: "app-page-title",
  templateUrl: "./pagetitle.component.html",
  styleUrls: ["./pagetitle.component.scss"],
})
export class PagetitleComponent implements OnInit {
  @Input() breadcrumbItems: Array<{}>;
  @Input() title: string;

  constructor(public topBar: TopBar) {}

  ngOnInit() {}
}
