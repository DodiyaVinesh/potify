import { Component, Input, OnInit } from '@angular/core';
import { faChartSimple, faClock } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  @Input('song') song;
  faChartSimple = faChartSimple;
  faClock = faClock;
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}
  changeSong(song) {
    this.playerService.changeSong(song);
  }
}
