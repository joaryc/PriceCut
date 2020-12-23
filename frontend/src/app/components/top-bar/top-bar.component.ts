import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() isLoggedIn;
  @Input() showModeratorBoard;
  @Input() username;
  @Output() logOutEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  logout(): void {
    this.logOutEvent.emit()
  }

}
