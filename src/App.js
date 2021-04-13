import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './components/header/header.component';
import Homepage from './components/homepage/homepage.component';
import { ModalStoryContextProvider } from './context/modal-story.context';
import StoriesPage from './page/stories-page/stories.component';



function App() {
  return (
    <div>
    <ModalStoryContextProvider>
    <Header />
    <Switch>
      <Route exact path ='/' render={()=> <Redirect to='/dashboards'  /> }  />
      <Route exact path='/dashboards' component={Homepage} />
      <Route exact path='/dashboards/:id' component={StoriesPage} /> 
    </Switch>
    </ModalStoryContextProvider>
    </div>
  );
}

export default App;
