import { Component, OnInit } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faAnglesRight = faAnglesRight;
  constructor() {}

  ngOnInit(): void {}
}
