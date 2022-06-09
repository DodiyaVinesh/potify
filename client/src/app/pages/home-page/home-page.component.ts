import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private playerService: PlayerService) {}
  allSongs: any[] = [];
  currentPlayingSong;
  ngOnInit(): void {
    this.playerService.searchSongs('lofi bollywood');
    this.playerService.allSongs.subscribe((data) => {
      this.allSongs = data;
    });
    this.playerService.currentSong.subscribe((data) => {
      this.currentPlayingSong = data;
    });
  }
}
