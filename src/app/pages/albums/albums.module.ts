import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlbumsRoutingModule} from './albums-routing.module';
import {AlbumsComponent} from './albums.component';
import {HttpModule} from '@angular/http';
import {AlbumService} from '../../services/albums/albums.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AlbumsRoutingModule
  ],
  declarations: [AlbumsComponent],
  providers: [AlbumService]
})
export class AlbumsModule {
}
