import { app } from "firebase";

// firebase init
var config = {
  apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
  authDomain: "berks-technology-club-admin.firebaseapp.com",
  databaseURL: "https://berks-technology-club-admin.firebaseio.com",
  projectId: "berks-technology-club-admin",
  storageBucket: "berks-technology-club-admin.appspot.com",
  messagingSenderId: "203643757535"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
