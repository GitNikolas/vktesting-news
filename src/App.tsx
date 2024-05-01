import { useState, useEffect, ReactNode, useMemo } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNews } from './app/News/newsSlice';
import { getLastestNews } from './utils/hackerNewsApi/hackerNewsApi';
import { NewsCard } from './components/NewsCard/NewsCard';


export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const dispatch = useAppDispatch();
  const {status, value} = useAppSelector(state => state.news)

  useEffect(() => {
    dispatch(getNews());
    setPopout(null);
  }, []);

  useEffect(() => {
    if(status === 'loading') {
      setPopout(<ScreenSpinner size="large" />);
    } else {
      setPopout(null);
    }
  }, [status])


  //Автообновление
  // useEffect(() => {
  //   const intervalId = setInterval(async() => {
  //     let res = await getLastestNews();
  //     if(value && (value[0].id !== res)){
  //       dispatch(getNews());
  //     }
  //   }, 60000);
  //   return () => clearInterval(intervalId);
  // }, [value])

  return (
    <SplitLayout popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id="home"/>
            <Persik id="persik" />
            <NewsCard id="news-card/:id" />
          </View>
        </SplitCol>
      </SplitLayout>
  );
};
