import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IPhoto} from '../../models/photo.model';

@Injectable()
export class PhotoService {
  private apiUrl = `http://jsonplaceholder.typicode.com`;
  private photosApiURL = `${this.apiUrl}/photos`;
  private photos: IPhoto[];

  constructor(private http: Http) {

  }

  private static errorHandler(error: Response): Observable<Response> {
    console.error(`PhotosService: ${error}`);
    return Observable.throw(error);
  }

  public getPhotosList(): Observable<any> {

    if (!!this.photos) {
      return Observable.from(this.photos);
    }

    return this.http
               .get(this.photosApiURL)
               .map((res: Response) => <IPhoto[]>res.json())
               .catch((error: Response) => PhotoService.errorHandler(error));
  }
}
