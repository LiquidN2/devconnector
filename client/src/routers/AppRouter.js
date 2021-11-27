import React from 'react';
import { Router, Switch } from 'react-router-dom';

import history from './history';

import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';

import PostPage from '../components/PostPage';
import PostByUserIdPage from '../components/PostByUserIdPage';

import ConnectionPage from '../components/ConnectionPage';

import ProfilePage from '../components/ProfilePage';
import ProfileEditPage from '../components/ProfileEditPage';
import ExperienceEditPage from '../components/ExperienceEditPage';
import EducationEditPage from '../components/EducationEditPage';
import ProfileByUserIdPage from '../components/ProfileByUserIdPage';
import SearchPage from '../components/SearchPage';
import MessagePage from '../components/MessagePage';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={PostPage} />

        <PublicRoute path="/register" component={RegisterPage} />
        <PublicRoute path="/login" component={LoginPage} />

        <PrivateRoute path="/profile/edit/experience" component={ExperienceEditPage} />
        <PrivateRoute path="/profile/edit/education" component={EducationEditPage} />
        <PrivateRoute path="/profile/edit" component={ProfileEditPage} />
        <PrivateRoute path="/profile/create" component={ProfileEditPage} />
        <PrivateRoute path="/profile/user/:userId" component={ProfileByUserIdPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />

        <PrivateRoute path="/posts/user/:userId" component={PostByUserIdPage} />
        <PrivateRoute path="/posts" component={PostPage} />
        
        <PrivateRoute path="/connections" component={ConnectionPage} />

        <PrivateRoute path="/messages/room/:roomId" component={MessagePage} />
        <PrivateRoute path="/messages" component={MessagePage} />

        <PrivateRoute path="/search" component={SearchPage} />
      </Switch>
    </Router>
  )
};

export default AppRouter;