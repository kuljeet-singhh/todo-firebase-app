import { auth, db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"



export const addTask = async (title: string) => {

  const user = auth.currentUser;

  if (!user) return;

  await addDoc(collection(db, "tasks"), {
    title: title,
    userId: user.uid
  });

};


export const getTasks = async () => {

  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const deleteTask = async (id) => {

  await deleteDoc(doc(db,"tasks",id));

};