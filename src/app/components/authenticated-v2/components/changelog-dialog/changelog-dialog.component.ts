import { Component, OnInit } from '@angular/core';
import {ChangelogService} from "../../../../services/changelog.service";

@Component({
  selector: 'app-changelog-dialog',
  templateUrl: './changelog-dialog.component.html',
  styleUrls: ['./changelog-dialog.component.css']
})
export class ChangelogDialogComponent implements OnInit {

  constructor(public changelog: ChangelogService) { }

  ngOnInit(): void {
  }

}
