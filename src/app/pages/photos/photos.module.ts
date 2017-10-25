import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PhotosRoutingModule} from './photos-routing.module';
import {PhotosComponent} from './photos.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {PhotoService} from '../../services/photos/photos.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    PhotosRoutingModule
  ],
  declarations: [PhotosComponent],
  providers: [PhotoService]
})
export class PhotosModule {
}
