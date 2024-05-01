import { FC, useEffect, useState, useMemo } from 'react';
import { Card, Headline, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Paragraph, Placeholder, Title } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NewsType } from '../../Types/NewsType';
import { fetchComments, fetchNews } from '../../utils/hackerNewsApi/hackerNewsApi';
import { Link } from '@vkontakte/vkui';
import { convertToData } from '../../utils/Date/convertToData';
import { CommentType } from '../../Types/CommentType';

export const NewsCard: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

    const params = useParams();

    const [selectNews, setSelectNews] = useState<NewsType | null>(null);
    const [comments, setComments] = useState<CommentType | null>(null);

//   useMemo(async() => {
//    if(params !== undefined && typeof params.id === `string`){
//     let res = await fetchNews(params.id);
//     setSelectNews(res);
//    }
//   }, [])


    //ТЕСТ
  useMemo(async() => {
    if(params !== undefined && typeof params.id === `string`){
     let res = await fetchNews(`121003`);
     console.log(res);
     setSelectNews(res);
     if(res.kids){
        let comment = await fetchComments(res.kids);
        console.log(comment);
        // setComments(comment)
     }
    }
   }, [])


  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>На главную</PanelHeader>
      {selectNews && <Card>
        <Headline> Ссылка: <Link href={selectNews.url} target='_blank'>{selectNews.url}</Link></Headline>
        <Title>Заголовок статьи: {selectNews.title}</Title>
        <Headline>Дата публикации: {convertToData(selectNews.time)}</Headline>
        <Headline>Автор: {selectNews.by}</Headline>
      </Card>}
    </Panel>
  );
};
