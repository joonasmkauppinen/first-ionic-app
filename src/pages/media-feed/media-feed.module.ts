import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaFeedPage } from './media-feed';

@NgModule({
  declarations: [
    MediaFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaFeedPage),
  ],
})
export class MediaFeedPageModule {}
