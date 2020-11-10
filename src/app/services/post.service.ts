import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operators/catchError';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private url = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private http:HttpClient) { 
    
  }

  getPosts = ()=>{
    return this.http.get(this.url, {observe:'response'});
  }

  createPost=(postData)=>{
    return this.http.post(this.url, JSON.stringify(postData), {observe: 'response'});
  }

  updatePost=(post)=>{
    return this.http.patch(this.url+post.id, JSON.stringify({
      isRead: true
    }), {observe: 'response'});
  }

  deletePost=(id)=>{
    return this.http.delete(this.url+id, {observe:'response'})
  }
}
