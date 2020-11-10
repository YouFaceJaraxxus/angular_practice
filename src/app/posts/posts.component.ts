import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any [];
  private url = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private service:PostService) { 
    
  }

  ngOnInit(): void {
    this.service.getPosts()
    .subscribe(response=>{
      this.posts = response.body as [];
      console.log('getAll', response)
    }, error=>{
      alert('Get all posts error.');
      console.log('get error', error);
    })
  }

  createPost=(input: HTMLInputElement)=>{
    let postData = {title: input.value};
    this.service.createPost(postData)
    .subscribe(response=>{
      postData['id'] = (response.body as any).id;
      console.log('create', response);
    }, (error:Response)=>{
      if(error.status==400){

      }
      else{
        alert('Create post error.');
        console.log('create error', error);
      }
    });
    this.posts.unshift(postData);
    input.value = '';
    console.log(postData);
  }

  updatePost=(post)=>{
    this.service.updatePost(post).subscribe(response=>{
      console.log('update', response)
    }, error=>{
      alert('Update post error.');
      console.log('update errpr', error);
    });
  }

  deletePost=(post)=>{
    this.service.deletePost(post.id).subscribe(response=>{
      console.log('delete', response)
    }, (error:Response)=>{
      if(error.status===404){
        alert('This post has already been deleted.');
      }
      else alert('Delete post error');
      console.log('delete error', error);
    });
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
  }

}
