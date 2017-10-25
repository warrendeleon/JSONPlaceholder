import {Component, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {IPhoto} from '../../models/photo.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../../services/photos/photos.service';
import lodash from 'lodash';
import swal from 'sweetalert2';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnChanges, OnDestroy {
  public photos: IPhoto[];
  public currentPage: number;
  public limit: number;
  public sortedPhotos: IPhoto[];
  public activedRouteSubscription: Subscription;

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              public photoService: PhotoService) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.limit = 5;
    this.activedRouteSubscription = this.activedRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.currentPage = !!queryParams && !!queryParams['page'] ? parseInt(queryParams['page'], 10) : 1;
        if (!!this.photos) {
          this.sort();
        }
      }
    );

    this.photoService.getPhotosList().subscribe(
      (photos: IPhoto[]) => {
        this.photos = photos;
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

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes);
  }

  ngOnDestroy(): void {
    if (!!this.activedRouteSubscription) {
      this.activedRouteSubscription.unsubscribe();
    }
  }

  public goToPhoto(id: number) {
    this.router.navigate([`photo/${id}`]);
  }

  public pageChanged(event: any): void {
    const queryParams = {
      page: event.page
    };
    this.router.navigate(['photos'], {queryParams});
  }

  private sort() {
    const realPage = this.currentPage - 1;
    const start = realPage > 0 ? realPage * this.limit : 0;
    const end = realPage > 0 ? (realPage + 1) * this.limit : this.limit;
    this.sortedPhotos = lodash.cloneDeep(this.photos).slice(start, end);
  }

}
