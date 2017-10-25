import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlbumsRoutingModule} from './albums-routing.module';
import {AlbumsComponent} from './albums.component';
import {HttpModule} from '@angular/http';
import {AlbumService} from '../../services/albums/albums.service';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    AlbumsRoutingModule
  ],
  declarations: [AlbumsComponent],
  providers: [AlbumService]
})
export class AlbumsModule {
}
