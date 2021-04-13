import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Config from './firebase.config';


firebase.initializeApp(Config);

export const logData = async () => {
  let dashboard;
  const collection = firestore.collection('dashboards');
  await collection.get().then(data => {
    console.log(data.docs[1].data(), data.docs)
    dashboard = data.docs[1].id;
  });
  console.log(dashboard);
  const collec = firestore.collection(`dashboards/${dashboard}/stories`);
  await collec.get().then(data => console.log(data.docs[0].data()))
}

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
  console.log(stories);
  let storiesArray = stories.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(storiesArray);
  return storiesArray
}


const createFirebaseTimestamp = () => {
  return firebase.firestore.Timestamp.fromDate(new Date())
}

let date = createFirebaseTimestamp();

export const setUpData = async (dashboard) => {
  console.log(dashboard);
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
export default firebase;