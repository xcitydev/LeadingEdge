// Copyright Paylancers 💳 2022
// 17 U.S.C §§ 101-1511

//import firebase config types
import { firebaseConfigTypes } from "./firebase.config.types";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  DocumentReference,
  arrayUnion,
  DocumentSnapshot,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";

//storage ref
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Firebase configuration
export const firebaseConfig: firebaseConfigTypes = {
  apiKey: "AIzaSyAPtQ9xL-Zh9LLiIKnCFLpAFOClf1XStdY",
  authDomain: "leading-edge-dd766.firebaseapp.com",
  projectId: "leading-edge-dd766",
  storageBucket: "leading-edge-dd766.appspot.com",
  messagingSenderId: "653427264622",
  appId: "1:653427264622:web:f819dc50d170f157a0aa7f",
  measurementId: "G-64T0JMN7M3",
};

// initialize the app
const app = initializeApp(firebaseConfig);

// firestore
export const db = getFirestore();

//Firebase AUTH
export const auth = getAuth();

// Firebase storage
export const storage = getStorage(app);

// create store
export const createStore = async (userWallet: any, values: any) => {
  const userDocRef = doc(db, "users", userWallet);
  console.log(userDocRef, "doc");
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot, "snapshot");
  const {
    businessName,
    description,
    businessLogoUrl,
    businessType,
    selectedCountry,
    createdAt,
  } = values;
  console.log("done");

  if (!userSnapshot.exists()) {
    const verification: boolean = true;
    const products: Array<any> = [];
    const sales: Array<any> = [];

    try {
      await setDoc(userDocRef, {
        userWallet,
        selectedCountry,
        businessType,
        businessLogoUrl,
        businessName,
        description,
        createdAt,
        verification,
        products,
        sales,
      });
      return (window.location.pathname = "/dashboard");
    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

// get each user data
export const getDataFromUID = async (userWallet: string) => {
  const userDocRef = doc(db, "users", userWallet);

  const userSnapshot = await getDoc(userDocRef);

  return userSnapshot.data();
};

// add product to firestore
export const addProductDetails = async (uid, values) => {
  console.log(values);
  const filteredObj = Object.fromEntries(
    Object.entries(values).filter(([key]) => !key.includes("imageLogo"))
  );

  const getDocRef: any = doc(db, "users", uid);
  const userSnapshot: any = await getDoc(getDocRef);

  if (userSnapshot.data()?.verification) {
    try {
      await updateDoc(getDocRef, {
        products: arrayUnion(filteredObj),
      });
      console.log("here");
    } catch (error) {
      console.log(error);
    }
  }
};

// get products
export const getProducts = async (uid) => {
  if (!uid) return;
  const getDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(getDocRef);
  if (userSnapshot.data()?.verification) {
    return userSnapshot.data()?.products;
  }
};

// get All products

export const getStores = async () => {
  let stores: Array<Object> = [];
  const querySnapShot: any = await getDocs(collection(db, "users"));
  querySnapShot.docs.map((doc) => stores.push(doc.data()));
  return stores;
};

export const checkIfUserExist = async (userWallet: string) => {
  const querySnapShot: any = await getDocs(collection(db, "users"));
  querySnapShot.forEach((user) => {
    let userId = user.get("userWallet");
    if (userId === userWallet) {
      console.log("Exist");
      return (window.location.pathname = "/dashboard");
    } else {
      console.log("Done");
      return (window.location.pathname = "/setup");
    }
  });
};

export const checkOut = async (vendorAddress: any) => {
  let tronWeb = await window.tronWeb;
  await tronWeb.request({
    method: "tron_requestAccounts",
  });

  //   const tradeobj = await tronWeb.transactionBuilder.sendTrx(
  //     toAddress,
  //     amount,
  //     fromAddress
  //   );
};
