import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  videoName: FormGroup;
  @ViewChild('myAudio') myAudio;
  videoId: string = 'p2HzZkd2A40';

  ngOnInit(): void {
    this.videoName = new FormGroup({
      video: new FormControl(),
    });
  }

  changeVideo() {
    this.videoId = this.videoName.value.video;
    this.updateVideo();
  }

  updateVideo() {
    if (!this.videoId) return;
    var audio_streams = {};
    fetch(
      'https://images' +
        ~~(Math.random() * 33) +
        '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=' +
        encodeURIComponent(
          'https://www.youtube.com/watch?hl=en&v=' + this.videoId
        )
    ).then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          var regex =
            /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;

          data = data.split('window.getPageData')[0];
          data = data.replace('ytInitialPlayerResponse = null', '');
          data = data.replace(
            'ytInitialPlayerResponse=window.ytInitialPlayerResponse',
            ''
          );
          data = data.replace(
            'ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};',
            ''
          );

          var matches = regex.exec(data);
          var dataObj =
            matches && matches.length > 1 ? JSON.parse(matches[1]) : false;

          console.log(data);

          var streams = [],
            result = {};

          if (dataObj.streamingData) {
            if (dataObj.streamingData.adaptiveFormats) {
              streams = streams.concat(dataObj.streamingData.adaptiveFormats);
            }

            if (dataObj.streamingData.formats) {
              streams = streams.concat(dataObj.streamingData.formats);
            }
          } else {
            return false;
          }

          streams.forEach(function (stream, n) {
            var itag = stream.itag * 1,
              quality: any = false;
            console.log(stream);
            switch (itag) {
              case 139:
                quality = '48kbps';
                break;
              case 140:
                quality = '128kbps';
                break;
              case 141:
                quality = '256kbps';
                break;
              case 249:
                quality = 'webm_l';
                break;
              case 250:
                quality = 'webm_m';
                break;
              case 251:
                quality = 'webm_h';
                break;
            }
            if (quality) audio_streams[quality] = stream.url;
          });

          console.log(audio_streams);

          this.myAudio.nativeElement.src =
            audio_streams['256kbps'] ||
            audio_streams['128kbps'] ||
            audio_streams['48kbps'];
          this.myAudio.nativeElement.play();
        });
      }
    });
  }
}
