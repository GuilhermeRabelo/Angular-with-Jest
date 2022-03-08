import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filter: any = {
    limit: 10,
    offset: 0,
    q: 'gorillaz',
    type: 'track'
  }

  tracks: any = [];
  searchInput = new FormControl('Linkin park');
  audio = new Audio();

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {  
  }

  async search(){
    this.tracks = []
    this.tracks = await this.homeService.getTracks({...this.filter, q: this.searchInput.value});
    this.tracks.items = _.reverse(_.sortBy(this.tracks.items, 'popularity'));
    this.tracks.items.forEach((track:any) => {
      track.formattedArtists = track.artists.map((x:any) => x.name).join(", "); 
    });
    // this.tracks = _.groupBy(this.tracks, 'album.name');    
    console.log(this.tracks);
  }

  play(track: any){
    this.tracks.items.forEach((track:any) => {
      track.playing = false;
    });
    
    track.playing = true;
    this.audio.pause();
    this.audio.volume = 0.1;
    this.audio.src = track.preview_url;
    this.audio.load();
    this.audio.play();
  }

  pause(track: any) {
    track.playing = false;
    this.audio.pause();
  }

}
