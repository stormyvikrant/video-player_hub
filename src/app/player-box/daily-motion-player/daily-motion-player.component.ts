import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { DailymotionPlayers } from 'src/global';

// declare const DM: DailymotionPlayers;
@Component({
  selector: 'app-daily-motion-player',
  templateUrl: './daily-motion-player.component.html',
  styleUrls: ['./daily-motion-player.component.scss'],
})
export class DailyMotionPlayerComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadDailymotionPlayer();
  }

  loadDailymotionPlayer() {
    const script = document.createElement('script');
    script.src = 'https://geo.dailymotion.com/player.js';
    script.setAttribute('data-video', 'x84sh87'); // Replace with your video ID
    script.async = true;

    // Append script to the specific container element
    const container = document.getElementById('dailymotion-player');
    if (container) {
      container.appendChild(script);
    } else {
      console.error('Container element not found.');
    }

    script.onload = () => {
      console.log('Dailymotion player script loaded.');
      // this.initializePlayer();
    };

    script.onerror = () => {
      console.error('Failed to load Dailymotion player script.');
    };
  }

  private player: any;
  isPlayerLoaded: boolean = false;

  // initializePlayer() {
  //   setTimeout(() => {
  //     if (typeof DM !== 'undefined') {
  //       const container = document.getElementById('dailymotion-player');
  //       if (container) {
  //         this.player = DM.player(container, {
  //           video: 'x84sh87', // Replace with your video ID
  //           params: {
  //             autoplay: 0, // Disable autoplay
  //           },
  //         });

  //         this.isPlayerLoaded = true;

  //         // Add event listeners
  //         this.player.addEventListener('play', () =>
  //           console.log('Video is playing')
  //         );
  //         this.player.addEventListener('pause', () =>
  //           console.log('Video is paused')
  //         );
  //         this.player.addEventListener('seek', () =>
  //           console.log('Video seeked')
  //         );
  //       } else {
  //         console.error('Container element not found.');
  //       }
  //     } else {
  //       console.error('DM is not defined.');
  //     }
  //   }, 1000); // Delay to ensure DM is defined
  // }

  playVideo() {
    if (this.isPlayerLoaded && this.player) {
      this.player.play();
      console.log('Play function called.');
    } else {
      console.error('Player is not loaded.');
    }
  }

  pauseVideo() {
    if (this.isPlayerLoaded && this.player) {
      this.player.pause();
      console.log('Pause function called.');
    } else {
      console.error('Player is not loaded.');
    }
  }
}
