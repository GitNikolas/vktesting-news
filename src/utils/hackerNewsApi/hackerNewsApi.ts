import { CommentType } from "../../Types/CommentType";

export async function fetchNews(id:string){
  try{
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    if(res.ok){
      let data = await res.json()
      return data;
    } else {
      throw new Error('Произошла ошибка')
    }
  }
  catch(err){
    console.error(err);
  }
}

  export async function fetchNewsIdArray(){
    try {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
      if(res.ok){
        let data = await res.json();
        data = data.slice(0,100);
        return data;
      } else {
        throw new Error('Произошла ошибка')
      }
    }
    catch(err){
      console.error(err);
    }

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
    try{
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
      if(res.ok){
        let data = await res.json();
        return data[0];
      } else {
        throw new Error('Произошла ошибка');
      }
    }
    catch(err){
      console.error(err)
    }
  }