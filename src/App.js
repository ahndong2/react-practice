import React from 'react';
import { Cookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { APP_ENV, HOST_API_DEVOPS } from 'Constans';
import 'styles/style.scss';
import * as container from 'page';

const App = () => {
  const cookies = new Cookies();
  if (!APP_ENV) {
    window.alert('.env 파일이 없습니다. .env.sample 을 참고하셔서 환경에 맞게 .env 파일을 생성해주세요.');
    return false;
  }

  if (APP_ENV === 'development') {
    // 로컬 토큰 셋팅
    const expiresRefreshTime = new Date(new Date().getTime() + 1 * 3600 * 1000);
    cookies.set('token', 'aWpWMGJDZzREdUR4MC9UcmZveTdaQT09', {
      domain: `.${window.location.hostname}`,
      expires: expiresRefreshTime,
      path: '/',
    });
  }

  return (
    <Router>
      <Route
        exact
        path="/"
        component={() => {
          window.location.href = HOST_API_DEVOPS;
          return null;
        }}
      />
      <Switch>
        <Route path="/sample" component={container.SampleContainer} />
        {/* 배포 */}
        <Route path="/deploy/index" component={container.DeployHistoryContainer} />
        <Route path="/deploy/deploy" component={container.DeployListContainer} />
        <Route path="/deploy/detail" component={container.DeployDetailContainer} />

        {/* 모니터링 */}
        <Route path="/log/index" component={container.AccessLogContainer} />

        {/* 사이트 관리 */}
        <Route path="/sitehome/view" component={container.SitehomeContainer} />

        {/* 배너 관리 */}
        <Route path="/banner/list" component={container.BannerListContainer} />
        <Route path="/banner/insert" component={container.BannerViewContainer} />
        <Route path="/banner/view" component={container.BannerViewContainer} />

        {/* 게시판 관리 */}
        <Route path="/board/listBoard" component={container.BoardListContainer} />
        <Route path="/board/listArticle" component={container.ArticleListContainer} />
        <Route path="/board/detailArticle" component={container.ArticleDetailContainer} />

        {/* region */}
        <Route path="/region/index" component={container.RegionContainer} />
      </Switch>
    </Router>
  );
};

export default App;
