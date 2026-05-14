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


export const getTasks = async (): Promise<{ id: string; title: string }[]> => {

  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: typeof data.title === "string" ? data.title : "",
    };
  });
};

export const deleteTask = async (id: string) => {

  await deleteDoc(doc(db,"tasks",id));

};