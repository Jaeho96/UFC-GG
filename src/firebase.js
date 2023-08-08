import { firebaseConfig } from './env';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, onSnapshot, getDocs, doc, increment, writeBatch } from "firebase/firestore";

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

// collection ref
const playerColRef = collection(db, 'player')
const recordColRef = collection(db, 'record')

// [ Cloud Firestore의 문서 생성 ]
export const addRecordDoc = async (recordValue) => {
    try {
        const docRef = await addDoc(recordColRef, recordValue);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// [실시간 Player 컬렉션 문서들 읽기]
//export const getPlayerCollectionDoc = (callback) => {
//    playerColRef.get().then((snapshot) => {
//      const playerArr = [];
//      snapshot.forEach((doc) => {
//        playerArr.push({ ...doc.data(), id: doc.id });
//      });
//      callback(playerArr);
//    });
//  };

export const getPlayerCollectionDoc = (callback) => {
    try {
      const unsubscribe = onSnapshot(playerColRef, (snapshot) => {
        const playerArr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        callback(playerArr);
      });
      return unsubscribe;
    } catch (e) {
      console.error("Error getting player collection documents: ", e);
      return null;
    }
  };
  

// [Record 컬렉션의 문서 변경으로 Player 컬렉션의 문서 변경]
const updatePlayerByRecord = () => {
    try {
        onSnapshot(recordColRef, (snapshot) => {
            const batch = writeBatch(db);
            snapshot?.forEach((docData) => {
                const recordDoc = doc(db, "record", docData.id);
                const winnerDoc = doc(db, "player", docData.data().winner);
                const loserDoc = doc(db, "player", docData.data().loser);

                if (docData.data()?.update !== true) {
                    batch.update(recordDoc, { update: true });
                    batch.update(winnerDoc, { win: increment(1) });
                    batch.update(loserDoc, { lose: increment(1) });
                }
            });
            batch.commit();
        });
    } catch (err) {
        console.error("Error updating document: ", err);
    }
}