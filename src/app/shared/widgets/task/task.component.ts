import { Component, OnInit, Input } from "@angular/core";
import { TopBar } from "src/app/layouts/shared/topbar/topbar.model";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() id: number;
  constructor(public topBar: TopBar) {}

  ngOnInit() {}
}
