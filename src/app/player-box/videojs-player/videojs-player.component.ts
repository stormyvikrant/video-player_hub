import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import videojs from 'video.js';

interface SubtitleTrack {
  src: Blob | string;
  srclang: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  label: string;
}
@Component({
  selector: 'app-videojs-player',
  templateUrl: './videojs-player.component.html',
  styleUrls: ['./videojs-player.component.scss'],
})
export class VideojsPlayerComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef!: ElementRef;
  player!: videojs.Player;
  vttContent: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.initializePlayer();

    // Use the public link obtained from Google Drive sharing settings
    const srtFilePath =
      'https://fantastic-kataifi-7c589e.netlify.app/assets/[Hindi]%20JADOO%20PODCAST%20_%20EP-06%20_%20SUBSCRIBE%20KARO%20[DownSub.com].srt'; // Ensure it’s in the correct format

    this.fetchAndConvertSrt(srtFilePath);
  }

  fetchAndConvertSrt(filePath: string) {
    this.http.get(filePath, { responseType: 'text' }).subscribe(
      (srtContent) => {
        this.convertorSrtToVtt(srtContent).then((vttContent) => {
          this.vttContent = vttContent;
          console.log('VTT Content:', this.vttContent);
          this.addSubtitleTracks();
        });
      },
      (error) => {
        console.error('Error fetching SRT file:', error);
      }
    );
  }

  convertorSrtToVtt(srtContent: string): Promise<string> {
    return new Promise((resolve) => {
      const lines = srtContent.split('\n');
      let vttContent = 'WEBVTT\n\n'; // Add WEBVTT header
      let index = 0;

      while (index < lines.length) {
        // Skip empty lines
        if (lines[index].trim() === '') {
          index++;
          continue;
        }

        // Check for caption index (e.g., "1", "2", etc.)
        if (!isNaN(parseInt(lines[index]))) {
          index++; // Move to the timestamp line
        }

        // Check if there is a timestamp line
        if (index < lines.length && lines[index].trim()) {
          const timestampLine = lines[index].trim();
          // Replace all commas with periods in the timestamp
          const vttTimestampLine = timestampLine.replace(/,/g, '.');
          vttContent += `${vttTimestampLine}\n`;
          index++;
        }

        // Read the caption text lines
        while (index < lines.length && lines[index].trim()) {
          vttContent += `${lines[index].trim()}\n`;
          index++;
        }

        // Add a blank line to separate captions
        vttContent += '\n';
      }

      // Trim any extra whitespace and ensure there's a blank line at the end
      resolve(vttContent.trim() + '\n');
    });
  }

  // addSubtitleVttTrack() {
  //   const vttBlob = new Blob([this.vttContent], { type: 'text/vtt' });
  //   const vttUrl = URL.createObjectURL(vttBlob);

  //   this.player.addRemoteTextTrack(
  //     {
  //       src: vttUrl, // Use the blob URL created from the VTT content
  //       kind: 'subtitles',
  //       srclang: 'hi',
  //       label: 'Hindi',
  //     },
  //     false // `false` means do not show track immediately
  //   );
  //   this.player.addRemoteTextTrack(
  //     {
  //       src: '../../../assets/captions-en.vtt', // Use the blob URL created from the VTT content
  //       kind: 'subtitles',
  //       srclang: 'en',
  //       label: 'English',
  //     },
  //     false // `false` means do not show track immediately
  //   );
  // }

  addSubtitleTracks() {
    const subtitleTracks: SubtitleTrack[] = [
      {
        src: new Blob([this.vttContent], { type: 'text/vtt' }),
        srclang: 'hi',
        kind: 'subtitles',
        label: 'Hindi',
      },
      {
        src: '../../../assets/captions-en.vtt',
        srclang: 'fe',
        kind: 'subtitles',
        label: 'English',
      },
      // Add more subtitle track objects here as needed
    ];

    subtitleTracks.forEach((track) => {
      const trackSrc =
        track.src instanceof Blob ? URL.createObjectURL(track.src) : track.src;
      this.player.addRemoteTextTrack(
        {
          src: trackSrc,
          kind: 'subtitles', // pre-defined  string value from video js
          srclang: track.srclang,
          label: track.label,
        },
        false // `false` means do not show track immediately
      );
    });
  }

  initializePlayer(): void {
    this.player = videojs(this.videoPlayerRef.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [
        {
          // src: 'https://vjs.zencdn.net/v/oceans.mp4', // Sample video
          // type: 'video/mp4',

          src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8', // Use this for HLS
          type: 'application/x-mpegURL',
        },
      ],
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
