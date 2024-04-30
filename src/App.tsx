import { useState, useEffect, ReactNode, useMemo } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNews } from './app/News/newsSlice';
import { getLastestNews } from './utils/hackerNewsApi/hackerNewsApi';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const dispatch = useAppDispatch();
  const {status, value} = useAppSelector(state => state.news)

  useMemo(async() => {
    let res =  await dispatch(getNews());
    setPopout(null);
  }, []);

  useEffect(() => {
    if(status === 'loading') {
      setPopout(<ScreenSpinner size="large" />);
    } else {
      setPopout(null);
    }
  }, [status])

  useEffect(() => {
    //ПЕРЕПИСАТЬ ФУНКЦИЮ АВТООБНОВЛЕНИЯ
    // const intervalId = setInterval(async() => {
    //   let res = await getLastestNews();
    //   if(value && res !== value[0].id) {
    //     dispatch(getNews());
    //   }
    // }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SplitLayout popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id="home" fetchedUser={fetchedUser} />
            <Persik id="persik" />
          </View>
        </SplitCol>
      </SplitLayout>
  );
};
