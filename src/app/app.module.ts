import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlbumsModule} from './pages/albums/albums.module';
import {AppRoutingModule} from './app-routing.module';
import {PhotosComponent} from './pages/photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlbumsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
