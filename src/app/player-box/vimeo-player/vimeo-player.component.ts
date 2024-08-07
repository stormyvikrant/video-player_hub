import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Player from '@vimeo/player';
@Component({
  selector: 'app-vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styleUrls: ['./vimeo-player.component.scss'],
})
export class VimeoPlayerComponent implements AfterViewInit {
  private videoPlayer!: Player; // Declare a private variable to store the Player instance
  showPlayer: boolean = false;
  @ViewChild('videoInput', { static: false })
  videoInput!: ElementRef<HTMLInputElement>;
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {}

  validateVideo() {
    if (this.videoInput && this.videoInput.nativeElement) {
      const videoId = this.extractVimeoVideoId(
        this.videoInput.nativeElement.value
      ); // extractId here

      if (videoId) {
        this.showPlayer = true;
        setTimeout(() => {
          this.checkVideo(videoId);
        }, 0);
      } else {
        alert('please provide valid Vimeo Url');
        if (this.videoPlayer) {
          this.videoPlayer.destroy();
        }
        this.showPlayer = false;
      }
    }
  }

  playVideo(): void {
    // Play the video
    this.videoPlayer
      .play()
      .then(() => {
        console.log('Video playback started');
      })
      .catch((error) => {
        this.videoPlayer.destroy();
        this.showPlayer = false;
        console.error('Error starting video playback:', error);
        throw new Error('This is a test error');
      });
  }

  checkVideo(videoId: number): void {
    // Create a new player instance with the new video ID
    this.videoPlayer = new Player(
      this.elementRef.nativeElement.querySelector('#video01'),
      {
        id: videoId,
      }
    );

    // Destroy current player instance
    this.videoPlayer.destroy();

    // Create a new player instance with the new video ID
    this.videoPlayer = new Player(
      this.elementRef.nativeElement.querySelector('#video01'),
      {
        id: videoId,
      }
    );

    // Example: Add event listener for the new player instance
    this.videoPlayer.on('play', () => {
      console.log('Played the new video');
    });

    // Example: Play the new video immediately
    this.playVideo();
  }

  extractVimeoVideoId(urlOrEmbedCode: string): number | null {
    // Vimeo video URL patterns
    const urlPattern =
      /(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/;

    // Vimeo iframe embed pattern
    const embedPattern =
      /<iframe.*?src=["'](?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/video\/(\d+)/;

    // Match Vimeo video ID from URL
    const urlMatch = urlOrEmbedCode.match(urlPattern);

    if (urlMatch && urlMatch[1]) {
      return parseInt(urlMatch[1], 10); // Extract and parse video ID
    }

    // Match Vimeo video ID from iframe embed code
    const embedMatch = urlOrEmbedCode.match(embedPattern);

    if (embedMatch && embedMatch[1]) {
      return parseInt(embedMatch[1], 10); // Extract and parse video ID
    }

    return null; // Return null if no match found
  }
}
