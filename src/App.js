import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './components/header/header.component';
import Homepage from './components/homepage/homepage.component';
import { ModalStoryContextProvider } from './context/modal-story.context';
import { UserContext } from './context/user.context';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import StoriesPage from './page/stories-page/stories.component';


function App() {
  let [currentUser, setCurrentUser] = useContext(UserContext)

  let unsubscribeFromAuth = null;
  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }
          );

        })
      } 
      
      setCurrentUser(userAuth);
      

    });

    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
    <ModalStoryContextProvider>
    <Header />
    <Switch>
      <Route exact path ='/' render={()=> <Redirect to='/dashboards'  /> }  />
      <Route exact path='/dashboards' component={Homepage} />
      <Route exact path='/dashboards/:id' component={StoriesPage} /> 
      {

      }
      <Route exact path='/signin' render={()=> currentUser
      ?
      <Redirect to='/' />
      :
       <SignInAndSignUp />
        } /> 

    </Switch>
    </ModalStoryContextProvider>
    </div>
  );
}

export default App;
