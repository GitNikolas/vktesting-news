import { FC, useEffect, useState, useMemo, useRef } from 'react';
import { Button, Card, CardGrid, Group, Headline, List, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Paragraph, Placeholder, Popper, Title } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NewsType } from '../../Types/NewsType';
import { fetchComments, fetchNews } from '../../utils/hackerNewsApi/hackerNewsApi';
import { Link } from '@vkontakte/vkui';
import { convertToData } from '../../utils/Date/convertToData';
import { CommentType } from '../../Types/CommentType';
import { Comments } from '../Comments/Comments';

export const NewsCard: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

    const params = useParams();

    const [selectNews, setSelectNews] = useState<NewsType | null>(null);
    const [comments, setComments] = useState<CommentType[] | null>(null);

  async function handleUpdateNews(){
    if(params !== undefined && typeof params.id === `string`){
      let res = await fetchNews(params.id);
      console.log(res);
      setSelectNews(res);
      if(res.kids){
         let commentResponse = await fetchComments(res.kids);
         if(commentResponse !== undefined){
          let comments = commentResponse.filter(item => !item.deleted);
          if(comments.length === 0){
           setComments(null);
          } else {
           setComments(comments);
          }
         }
      }
     }
  }

  useEffect(() => {
    handleUpdateNews();
   }, [])

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>На главную</PanelHeader>
      {selectNews && <Card style={{padding: '20px', marginBottom:'20px'}}>
        <Headline> Ссылка: <Link href={selectNews.url} target='_blank'>{selectNews.url}</Link></Headline>
        <Title>Заголовок статьи: {selectNews.title}</Title>
        <Headline>Дата публикации: {convertToData(selectNews.time)}</Headline>
        <Headline>Автор: {selectNews.by}</Headline>
      </Card>}

      <Group>
        <Title>Комментарии</Title>
        <Button style={{margin:'10px'}} onClick={handleUpdateNews}>Обновить</Button>
        <CardGrid size='l' spaced>
          { comments ?
            comments.map(comment => ( 
              <Comments
              key={comment.id}
              by={comment.by}
              id={comment.id}
              kids={comment.kids}
              parent={comment.parent}
              text={comment.text}
              time={comment.time}
              type={comment.type}
              ></Comments>
          ))
            :
            <Headline>Комментариев пока нет.</Headline>
          }
        </CardGrid>
      </Group>

    </Panel>
  );
};
