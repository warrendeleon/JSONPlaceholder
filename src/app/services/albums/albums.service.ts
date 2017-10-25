import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IAlbum} from '../../models/album.model';

@Injectable()
export class AlbumService {
  private apiUrl = `http://jsonplaceholder.typicode.com`;
  private albumsApiURL = `${this.apiUrl}/albums`;
  private albums: IAlbum[];

  constructor(private http: Http) {

  }

  private static errorHandler(error: Response): Observable<Response> {
    console.error(`AlbumService: ${error}`);
    return Observable.throw(error);
  }

  public getAlbumsList(): Observable<any> {

    if (!!this.albums) {
      return Observable.from(this.albums);
    }

    return this.http
               .get(this.albumsApiURL)
               .map((res: Response) => <IAlbum[]>res.json())
               .catch((error: Response) => AlbumService.errorHandler(error));
  }
}
