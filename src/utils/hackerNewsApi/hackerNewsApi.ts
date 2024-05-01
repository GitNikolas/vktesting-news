import { CommentType } from "../../Types/CommentType";

export async function fetchNews(id:string){
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  let data = await res.json()
  return data;
}

export async function fetchNewsArray(){
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
    let data = await res.json();
    data = data.slice(0,100);
    let newsArr = [];
    for(let i = 0; i < data.length; i++){
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`);
      const news = await res.json();
      newsArr.push(news);
    }
    return newsArr;
  }

  export async function fetchComments(idArray:number[]) {
    try{
      let commentsArr = [];
      for(let i = 0; i < idArray.length; i++){
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${idArray[i]}.json?print=pretty`);
        const comment = await res.json();
        commentsArr.push(comment);
      }
      return commentsArr;
    }
    catch(err){
      console.log(err);
    }

  }

  export async function getLastestNews(){
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
    let data = await res.json();
    return data[0];
  }