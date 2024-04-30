import { FC, useMemo, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { View, Group, CardGrid, Card, Spacing } from '@vkontakte/vkui';

export const NewsList: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [news,setNews] = useState<any>(null);

  async function fetchNewsArray(){
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
    let data = await res.json();
    data = data.slice(0,100);
    let newsArr = [];
    for(let i = 0; i < data.length; i++){
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`);
      const news = await res.json();
      newsArr.push(news);
    }
    setNews(newsArr);
  }

  useMemo(async() => {
    let res = await fetchNewsArray();
  }, [])

  return (
    <View activePanel="card">
    <Panel id="card">
        <PanelHeader>CardGrid</PanelHeader>
        
        
        <CardGrid size="l" spaced>

        {news.map((item:any, index:number)=> <Card key={item.id}>
            <div style={{ paddingBottom: '30%' }} >
            <p>{index + 1}. {item.title}</p>
            </ div>
        </Card>)}
        
        </CardGrid>
        <Spacing size={16} />
    </Panel>
    </View>
  );
};
