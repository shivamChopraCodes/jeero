import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBQD4baZZ7rBWQ4Oeln_Gy5SMJ9fQDXhIw",
  authDomain: "jeero-db.firebaseapp.com",
  projectId: "jeero-db",
  storageBucket: "jeero-db.appspot.com",
  messagingSenderId: "353837388230",
  appId: "1:353837388230:web:b8f2984ca7f7283ee362c7"
};


firebase.initializeApp(config);
const createFirebaseTimestamp = () => {
  return firebase.firestore.Timestamp.fromDate(new Date())
}

let date = createFirebaseTimestamp();

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName , email } = userAuth;
    const createdAt = date;

    try {

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      
    } catch (error) {
      
    }
  }
  return userRef;
}; 

export const getDashboards = (dashboards) => {
  let newArray = dashboards.docs.map(doc => {
    let { name } = doc.data()
    return ({
      id: doc.id,
      name
    })
  });
  return newArray;
}


export const getStories = (stories) => {
  
  let storiesArray = stories.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  return storiesArray
}




export const setUpData = async (dashboard) => {
  
  let count = 1
  let collectionRef = firestore.collection(`dashboards/${dashboard}/stories`);
  let batch = firestore.batch();
  while (count < 7) {
    collectionRef.add({
      "assignedTo": "User 2",
      "comments": [
          {
              "time": date,
              "commentBy": "User",
              "message": "Sup buddy"
          },
          {
              "time": date,
              "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum tortor nec ligula egestas tempor. Donec rutrum scelerisque justo.",
              "commentBy": "User"
          }
      ],
      "name": `Test-${count}`,
      "createdOn": date,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum tortor nec ligula egestas tempor. Donec rutrum scelerisque justo. Fusce imperdiet mi eget metus pellentesque, vitae fermentum mauris molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac nisl mauris. Maecenas hendrerit placerat libero, at iaculis nisi tristique bibendum. Maecenas eget enim ut urna tincidunt venenatis a eget risus. Vivamus sapien arcu, egestas vel commodo non, commodo a massa. Quisque suscipit, arcu vitae ultricies pulvinar, arcu justo faucibus mi, id posuere eros turpis sed orci. Suspendisse faucibus ligula pulvinar, posuere magna eu, porttitor libero. Aliquam malesuada ornare suscipit. Mauris fringilla sed ipsum eget ullamcorper. Phasellus rutrum vitae lorem et consectetur.",
      "createdBy": "User",
      "status": "new"
  });
  count++;
  }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;