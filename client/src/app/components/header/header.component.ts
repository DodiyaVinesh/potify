import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faCoffee = faMicrophone;
  searchInp = new FormControl('');
  constructor(private http: HttpClient, private playerService: PlayerService) {}

  ngOnInit(): void {
    var recognition = new (window as any).webkitSpeechRecognition();
  }
  search() {
    let query = this.searchInp.value;
    this.searchInp.setValue('');
    this.playerService.searchSongs(query);
  }
}
