import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  dateNow = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
