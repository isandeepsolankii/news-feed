import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getFirestore,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARlpRjbC03aVrMpu_Zma_8YRbYosjATlc",
  authDomain: "social-media-e39c8.firebaseapp.com",
  databaseURL: "https://social-media-e39c8-default-rtdb.firebaseio.com",
  projectId: "social-media-e39c8",
  storageBucket: "social-media-e39c8.firebasestorage.app",
  messagingSenderId: "189613670996",
  appId: "1:189613670996:web:f5f5b0b35e8c1ce8f163c1",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

const googleProvider = new GoogleAuthProvider(firebaseApp);

const fireStore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe(); // Cleanup subscription
  });

  async function CreateAccountWithEmailAndPassword(email, password, userName) {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: userName,
        });
      })
      .then((value) => {
        console.log(
          "Account created and displayName updated successfully.",
          value
        );
      })
      .catch((error) => {
        console.error("Error occurred while creating account:", error);
      });
  }

  async function LoginWithEmailAndPassword(email, password) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => console.log("Logged in Successfully", value))
      .catch((error) => console.error("Error While Loggin", error));
  }

  function Logout() {
    signOut(firebaseAuth)
      .then(() => console.log("Logged out Successfully"))
      .catch((e) => console.log("Error logging out", e));
  }

  //Listing

  async function handleNewPost(newsTitle, newsDescription) {
    const userDocRef = doc(fireStore, `users/${user.uid}`);

    // Add or update the post under the user's document
    await setDoc(
      userDocRef,
      {
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        posts: arrayUnion({
          newsTitle,
          newsDescription,
          likes: 1,
          comments: 10,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true } // Ensures we don't overwrite existing user data
    );
  }

  async function handleEditUserDetails(dob, userName, phoneNumber, bio) {
    const userDocRef = doc(fireStore, `edit/${user.uid}`);

    await setDoc(userDocRef, {
      userID: user.uid,
      userName,
      dob,
      phoneNumber,
      bio,
    });
  }

  async function getUserPosts() {
    try {
      const userDocRef = doc(fireStore, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const posts = userData.posts || []; // Default to an empty array if no posts exist
        console.log("Posts:", posts);
        return posts;
      } else {
        console.log("No such user document!");
        return [];
      }
    } catch (error) {
      console.error("Error retrieving user posts:", error);
      return [];
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        CreateAccountWithEmailAndPassword,
        LoginWithEmailAndPassword,
        user,
        Logout,
        handleNewPost,
        getUserPosts,
        handleEditUserDetails,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
