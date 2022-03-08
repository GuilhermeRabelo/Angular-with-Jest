import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getTracks(filter: any) {
    try {
      let response: any = await this.httpClient.get(`${environment.api_url}`, {params: filter}).toPromise();
      return response.tracks;
    } catch (error) {
      throw error;
    }
  }
}
