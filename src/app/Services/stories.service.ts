import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SearchCriteria } from '../Interfaces/SearchCriteria';
import { Story } from '../Interfaces/Story';

@Injectable({
  providedIn: 'root'
})

export class StoriesService {

  constructor(private http: HttpClient) { }

  storyList: Array<Story> = []
  loading: boolean = false;

  /**
   * Gets the latest stories that match the search criteria.
   * @param searchCriteria (SearchCriteria) An object representing the search criteria to apply to the story list.
   */
  getStories(searchCriteria: SearchCriteria): void {

    console.log("Getting stories.");
    
    this.storyList = Array<Story>();
    this.loading = true;

    const idPromise = this.getStoryIds().toPromise();

    // If we don't use an arrow function here, the context of this changes and the 
    // properties and methods of the service are not available to nexted functions.
    idPromise.then((ids) => {

      ids.forEach((value, idx) => {
        if(idx < searchCriteria.storyCount || searchCriteria.storyCount == 0) {
          this.getStory(value).subscribe(story => {
            this.storyList.push(story)
            console.log(story);
          });
        }
      })

      this.loading = false;
      
    });

  }

  /**
   * Retrieve the latest list of stories from the API.
   */
  getStoryIds(): Observable<Array<number>> {
    
    console.log("Getting latest story IDs");
    let path = "https://hacker-news.firebaseio.com/v0/newstories.json";
    return this.http.get<Array<number>>(path);

  }

  /**
   * Get story with the specified ID.
   * @param storyId (number) The ID of the story to retrieve from the server.
   */
  getStory(storyId: number): Observable<Story> {
    console.log("Getting story id " + storyId);
    let path = "https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json";
    return this.http.get<Story>(path);
  };

  /**
   * Converts a UNIX timestamp to an en-US date string.
   * @param timeStamp (number) the UNIX timestamp to convert to an en-US Date string.
   */
  getFormattedTime(timeStamp: number): string {
    var s = new Date(timeStamp * 1000).toLocaleDateString("en-US")
    return s;
  }

}
