"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";

export default function Home() {
  const [quests, setQuests] = useState([]);

  const questsColection = collection(db, "quests");

  // Adicionar
  async function saveAddQuest(titulo) {
    await addDoc(questsColection, {
      title: titulo,
      status: "aberto",
      priority: "Normal",
      created_at: new Date().toISOString(),
    });
    getQuests();
  }

  //Delete
  async function deleteQuest(quest) {
    const questRef = doc(db, `quests`, quest.id);
    await deleteDoc(questRef);
    getQuests();
  }

  //Editar quest
  async function saveEditQuest(quest, title, priority) {
    const questRef = doc(db, `quests`, quest.id);
    await updateDoc(questRef, {
      title: title || quest.title,
      priority: priority || quest.priority || `Normal`,
    });
    getQuests();
  }
  //Editar quest
  async function saveConcludedQuest(quest) {
    const questRef = doc(db, `quests`, quest.id);
    await updateDoc(questRef, {
      status: `concluído`,
    });
    getQuests();
  }

  //Read
  async function getQuests() {
    const q = query(questsColection, orderBy("created_at", "asc"));
    const data = await getDocs(q);
    const questsList = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuests(questsList);
  }

  useEffect(() => {
    getQuests();
  }, []);
  //saveAddQuest("Danilo of Legends")

  const concludedQuests = quests.filter(
    (quest) => quest.status === "concluído"
  );
  const notConcludedQuests = quests.filter(
    (quest) => quest.status === "aberto"
  );

  return (
    <div
      className="flex h-screen justify-center items-center bg-[url('/image.png')] 
    bg-cover bg-center"
    >
      <div
        className="card w-[80%] lg:w-[50%] bg-blue-400 min-h-[70%] max-h-screen 
      overflow-auto scrollbar-hide shadow-lg rounded-sm transform ease-out duration-300 
      items-center p-10 gap-5"
      >
        <p className="text-4xl font-work font-bold w-fit text-center text-white">
          Quests To Do
        </p>

        <AddQuest saveAddQuest={saveAddQuest} />

        <p>Abertas: </p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <QuestList
            quests={notConcludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p>Concluídas: </p>
          <QuestList
            quests={concludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}
          />
        </div>
      </div>
    </div>
  );
}
