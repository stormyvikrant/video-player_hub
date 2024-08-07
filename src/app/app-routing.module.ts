import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VimeoPlayerComponent } from './player-box/vimeo-player/vimeo-player.component';
import { DailyMotionPlayerComponent } from './player-box/daily-motion-player/daily-motion-player.component';
import { PdfDemoComponent } from './web-pdf/pdf-demo/pdf-demo.component';
import { PdfViewComponent } from './web-pdf/pdf-view/pdf-view.component';
import { VideojsPlayerComponent } from './player-box/videojs-player/videojs-player.component';

const routes: Routes = [
  { path: '', component: VimeoPlayerComponent }, // Default route
  { path: 'vimeo-player', component: VimeoPlayerComponent },
  { path: 'daily-motion', component: DailyMotionPlayerComponent },
  { path: 'pdfweb', component: PdfDemoComponent },
  { path: 'pdfview', component: PdfViewComponent },
  { path: 'videoJs', component: VideojsPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
