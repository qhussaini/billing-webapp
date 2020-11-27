import { Component, OnInit, Input } from "@angular/core";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements OnInit {
  @Input() image: string;
  @Input() name: string;
  @Input() text: string;
  constructor(public topBar: TopBar) {}

  ngOnInit() {}
}
