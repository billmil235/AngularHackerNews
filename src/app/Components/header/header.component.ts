import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from '../../Interfaces/SearchCriteria';
import { StoriesService } from '../../Services/stories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchCriteria: SearchCriteria = {
    storyCount: 20,
    keyWords: ""
  };

  constructor(private storiesService: StoriesService) { }

  ngOnInit(): void {
    //this.storiesService.getStories(this.searchCriteria);
  }

  getStories(): void {
    console.log("Calling story service.");
    this.storiesService.getStories(this.searchCriteria);
  }

}
