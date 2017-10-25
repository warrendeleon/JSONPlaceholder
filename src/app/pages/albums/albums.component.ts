import {Component, OnInit} from '@angular/core';
import {IAlbum} from '../../models/album.model';
import {AlbumService} from '../../services/albums/albums.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  public albums: IAlbum[];

  constructor(public albumService: AlbumService) {
  }

  ngOnInit() {
    this.albumService.getAlbumsList().subscribe(
      (albums: IAlbum[]) => this.albums = albums,
      (error: Response) => swal(
        {
          title: `Error ${error.status}`,
          text: error.statusText,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }
      ));
  }

}
