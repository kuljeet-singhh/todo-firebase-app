import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export const signupUser = async (email: string, password: string, username: string) => {

  console.log("Signup started");

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  console.log("User created:", user.uid);

  // await setDoc(doc(db, "users", user.uid), {
  //   username,
  //   email
  // });

  console.log("User saved to Firestore:", user.uid);

  await updateProfile(user, {
    displayName: username
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {



  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return userCredential.user;   // success response


};