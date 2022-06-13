import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  allSongs: BehaviorSubject<any> = new BehaviorSubject([]);
  currentSong: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  searchSongs(query) {
    this.http
      .get(`${environment.server_url}search`, { params: { query } })
      .subscribe((data: any) => {
        this.allSongs.next(data.data);
        this.currentSong.next(data.data[0]);
      });
  }

  changeSong(song) {
    this.currentSong.next(song);
  }
}
