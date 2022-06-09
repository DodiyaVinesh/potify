import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import {
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faChartSimple,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('songEl') songEl: YouTubePlayer;
  @ViewChild('progressEl') progressEl: ElementRef;

  isPlaying = false;
  faPlay = faPlay;
  faPause = faPause;
  faBackwardStep = faBackwardStep;
  faForwardStep = faForwardStep;
  faChartSimple = faChartSimple;
  faClock = faClock;
  song: any = null;
  config = {
    enablejsapi: 1,
    cc_load_policy: 1,
  };

  progressBar = 0;
  currentTimeStamp = 0;
  timeInterval: any = null;
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    let isFirst = true;
    this.playerService.currentSong.subscribe((data) => {
      if (!data) return;
      this.song = data;
      // autoplay when song changes
      if (!isFirst) {
        console.log(this.songEl);
        const onLoadSubscription = this.songEl.stateChange.subscribe(
          (status) => {
            console.log(status);
            if (status.data == 5) {
              onLoadSubscription.unsubscribe();
              this.play();
            }
          }
        );
      } else {
        isFirst = false;
      }
    });
  }

  setSpeed(n) {
    console.log('rate', n);
    this.songEl.setPlaybackRate(n);
  }
  setVolume(n) {
    console.log('volume', n);
    this.songEl.setVolume(n);
  }
  play() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    }
    console.log(this.songEl);
    this.timeInterval = setInterval(() => {
      this.progressBar =
        (100 * this.songEl.getCurrentTime()) / this.songEl.getDuration();
      this.progressEl.nativeElement.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${this.progressBar}%, #fff ${this.progressBar}%, white 100%)`;
      this.currentTimeStamp = this.songEl.getCurrentTime();
    }, 100);
    this.isPlaying = true;
    this.songEl.playVideo();
  }
  pause() {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
    this.isPlaying = false;
    this.songEl.pauseVideo();
  }
  seekTo(e: Event) {
    let seekPerc = parseInt((e.target as HTMLInputElement).value);
    let seekSec = (seekPerc / 100) * this.songEl.getDuration();
    this.songEl.seekTo(seekSec, true);
  }
  seekFixed(forword: boolean) {
    if (forword) {
      this.songEl.seekTo(this.songEl.getCurrentTime() + 10, true);
    } else {
      this.songEl.seekTo(this.songEl.getCurrentTime() - 10, true);
    }
  }
}
