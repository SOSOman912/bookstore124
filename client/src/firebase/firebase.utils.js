 import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import axios from 'axios';

const config = 
{
    apiKey: "AIzaSyBsTCUdDmDdebUujFOLYE4ldWzjVWZDkm0",
    authDomain: "charismatic-age-301711.firebaseapp.com",
    projectId: "charismatic-age-301711",
    storageBucket: "charismatic-age-301711.appspot.com",
    messagingSenderId: "9738776260",
    appId: "1:9738776260:web:053daa12f3f7e2f6b16391",
    measurementId: "G-MJ7Y2L1MR7"
  };

  firebase.initializeApp(config);

//   const GenerateToken = function () {
//   const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let token = '';
//   for (let i = 0; i < 25; i++) {
//     token += characters[Math.floor(Math.random() * characters.length)];
//   }
//   return token;
// } 

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  		 if (!userAuth) return;

        const { displayName } = userAuth;

        console.log("hello");

        const createdAt = new Date();

        const data = {
        user_id: userAuth.uid,
        username: displayName,
        email: userAuth.email,
        cart_list:null,
        status:"Active",
        created_on: createdAt,
      }

  		 return {userAuth:userAuth,dataSet:data};
  };

  export const CheckIfUserExist = (id) => {
    return axios.get('/api/checkifexist' , {
      params: {
        user_id:id
      }
    })
  }

   export const createUserProfileInDatabaseVerfied = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const createdAt = new Date();

    axios({
      url: '/api/userDocumentUpload',
      method: 'post',
      data: {
        user_id: userAuth.uid,
        username: additionalData,
        email: userAuth.email,
        cart_list:null,
        status:"Active",
        created_on: createdAt,
      }
      
    }).then(response => {
      console.log(response);
    })
  }

  export const createUserProfileInDatabase = async (userAuth, additionalData) => {
    if (!userAuth) return;

    axios({
      url: '/api/userDocumentUpload',
      method: 'post',
      data: {
        user_id: userAuth.uid,
        username: additionalData,
        email: userAuth.email,
        cart_list:null,
        status:"Active",
        created_on: new Date(),
      }
    }).then(response => {
      console.log(response);
    })
  }

  export const addCollectionAndDocument = async(collectionName, objects) => {
    const collectionRef = firestore.collection(collectionName);

    const batch = firestore.batch();
    objects.forEach(object => {
      var newDocRef = collectionRef.doc(object.title);
      // batch.set(newDocRef, {"title": object.title,"id": object.id});
      var MencollectionRef = newDocRef.collection("womens");
      for (var i = 0; i < object.womens.length / 4 ; i++){
          var DocRef = MencollectionRef.doc(object.womens[i].product_id);
          batch.set(DocRef, object.womens[i]);
      }
    })
    return await batch.commit();
  } 

  export const addItemToCartList = () => {
    
  }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
