import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPhoto} from '../../models/photo.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../../services/photos/photos.service';
import lodash from 'lodash';
import swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  public photos: IPhoto[];
  public currentPage: number;
  public page: number;
  public limit: number;
  public totalPages: number;
  public sortedPhotos: IPhoto[];
  public searchForm: FormGroup;
  public searchTerm: string;
  activedRouteSubscription: Subscription;
  searchTermSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public activedRoute: ActivatedRoute,
              public photoService: PhotoService) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.limit = 5;

    this.activedRouteSubscription = this.activedRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.currentPage = !!queryParams && !!queryParams['page'] ? parseInt(queryParams['page'], 10) : 1;
        this.page = this.currentPage;
        this.searchTerm = !!queryParams && !!queryParams['searchTerm'] ? queryParams['searchTerm'] : '';

        console.log(`currentPage: ${this.currentPage}`);

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
      )
    );

    this.searchForm = this.formBuilder.group({
      searchTerm: !!this.searchTerm ? this.searchTerm : ''
    });

    // WAIT FOR POSTCODE TO CHANGE THEN FIRE A VALIDATE POSTCODE CALL
    // RxJS do operator is usually for side effects, its not a good practice this should emit in an eventemitter
    this.searchTermSubscription = this.searchForm.get('searchTerm')
                                      .valueChanges
                                      .debounceTime(400)
                                      .distinctUntilChanged()
                                      .do(searchTerm => {
                                        const queryParams = {
                                          page: this.currentPage,
                                          searchTerm: !!searchTerm && searchTerm.length > 0 ? searchTerm : undefined
                                        };

                                        this.router.navigate(['photos'], {queryParams});
                                      })
                                      .subscribe();
  }

  ngOnDestroy(): void {
    if (!!this.activedRouteSubscription) {
      this.activedRouteSubscription.unsubscribe();
    }

    if (!!this.searchTermSubscription) {
      this.searchTermSubscription.unsubscribe();
    }
  }

  public goToPhoto(id: number) {
    this.router.navigate([`photo/${id}`]);
  }

  goToPage(event: any) {
    this.currentPage = event.page;
    const queryParams = {
      page: this.currentPage,
      searchTerm: !!this.searchTerm && this.searchTerm.length > 0 ? this.searchTerm : undefined
    };

    this.router.navigate(['photos'], {queryParams});
  }

  private sort() {
    const filteredPhotos =
      !!this.searchTerm && this.searchTerm.length > 0 ?
        lodash.filter(lodash.cloneDeep(this.photos), (photo: IPhoto) => photo.title.indexOf(this.searchTerm) > -1) :
        lodash.cloneDeep(this.photos);
    const realPage = this.currentPage - 1;
    const start = realPage > 0 ? realPage * this.limit : 0;
    const end = realPage > 0 ? (realPage + 1) * this.limit : this.limit;
    this.totalPages = filteredPhotos.length;
    this.sortedPhotos = lodash.cloneDeep(filteredPhotos).slice(start, end);
  }

}
