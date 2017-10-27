import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAlbum} from '../../models/album.model';
import {AlbumService} from '../../services/albums/albums.service';
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import lodash from 'lodash';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  public albums: IAlbum[];
  public currentPage: number;
  public limit: number;
  public sortedAlbums: IAlbum[];
  public activedRouteSubscription: Subscription;

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              public albumService: AlbumService) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.limit = 5;
    this.activedRouteSubscription = this.activedRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.currentPage = !!queryParams && !!queryParams['page'] ? parseInt(queryParams['page'], 10) : 1;
        if (!!this.albums) {
          this.sort();
        }
      }
    );

    this.albumService.getAlbumsList().subscribe(
      (albums: IAlbum[]) => {
        this.albums = albums;
        this.sort();
      },
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

  ngOnDestroy(): void {
    if (!!this.activedRouteSubscription) {
      this.activedRouteSubscription.unsubscribe();
    }
  }

  public goToPhotos(id: number) {
    const queryParams = {
      album: id
    };
    this.router.navigate(['photos'], {queryParams});
  }

  public pageChanged(event: any): void {
    const queryParams = {
      page: event.page
    };
    this.router.navigate(['albums'], {queryParams});
  }

  private sort() {
    const realPage = this.currentPage - 1;
    const start = realPage > 0 ? realPage * this.limit : 0;
    const end = realPage > 0 ? (realPage + 1) * this.limit : this.limit;
    this.sortedAlbums = lodash.cloneDeep(this.albums).slice(start, end);
  }

}
