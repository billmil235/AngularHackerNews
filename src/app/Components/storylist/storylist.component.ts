import { Component, OnInit, Input } from '@angular/core';
import { StoriesService } from '../../Services/stories.service';

@Component({
  selector: 'app-storylist',
  templateUrl: './storylist.component.html',
  styleUrls: ['./storylist.component.css']
})
export class StorylistComponent implements OnInit {

  constructor(public storiesService: StoriesService) { }

  ngOnInit(): void {
  }

}
