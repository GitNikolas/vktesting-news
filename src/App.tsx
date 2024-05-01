import { useState, useEffect, ReactNode, useMemo } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNews, handleClearValue } from './app/News/newsSlice';
import { fetchNews, fetchNewsIdArray, getLastestNews } from './utils/hackerNewsApi/hackerNewsApi';
import { NewsCard } from './components/NewsCard/NewsCard';


export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const dispatch = useAppDispatch();
  const {status, value} = useAppSelector(state => state.news)

  useMemo(async() => {
    let res = await fetchNewsIdArray();
    res.map((item:string) => dispatch(getNews(item)));
  }, []);

  useEffect(() => {
    if(status === 'loading') {
      setPopout(<ScreenSpinner size="large" />);
    } else {
      setPopout(null);
    }
  }, [status])

  useEffect(() => {
    const intervalId = setInterval(async() => {
      let res = await getLastestNews();
      if(value.length > 0 && (value[0].id !== res)){
        dispatch(handleClearValue());
        let res = await fetchNewsIdArray();
        res.map((item:string) => dispatch(getNews(item)));
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [value])

  return (
    <SplitLayout popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id="home"/>
            <NewsCard id="news-card/:id" />
          </View>
        </SplitCol>
      </SplitLayout>
  );
};
