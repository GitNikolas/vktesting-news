import { FC, useMemo, useState, ReactNode } from 'react';
import { Button, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { View, Group, CardGrid, Card, Spacing } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NewsType } from '../../Types/NewsType';
import { getNews } from '../../app/News/newsSlice';
import { ScreenSpinner } from '@vkontakte/vkui';

export const NewsList: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const news = useAppSelector(state => state.news.value);
  const dispatch = useAppDispatch();
  const [newsList,setNewsList] = useState<NewsType[] | null>(null);
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  useMemo(() => {
    setNewsList(news);
  }, [news])

  function convertToData(timeStamp:number){
      const data = new Date(timeStamp * 1000);
      let date = data.toLocaleString();
      return date;
  }

  function hadleUpdateNews(){
      dispatch(getNews());
  }

  return (
    <View activePanel="card">
    <Panel id="card">
        {/* <PanelHeader>CardGrid</PanelHeader> */}
        
        <CardGrid size="l" spaced>

        <Button onClick={hadleUpdateNews}>Обновить</Button>

        {newsList?.map((item:NewsType, index:number)=> <Card key={item.id}>
            <div style={{ padding: '1%' }} >
            <p>{index + 1}. {item.title}</p>
            <p>Автор: {item.by}</p>
            <p>Рейтинг: {item.score}</p>
            <p>Дата публикации: {convertToData(item.time)}</p>
            </ div>
        </Card>)}
        
        </CardGrid>
        <Spacing size={16} />
    </Panel>
    </View>
  );
};
