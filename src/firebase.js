import { firebaseConfig } from './env';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, onSnapshot, query, where, setDoc, updateDoc, getDoc, doc, increment, writeBatch } from "firebase/firestore";

// init firebase app
let app = initializeApp(firebaseConfig);

// init services
let db = getFirestore(app);

// collection ref
const playerColRef = collection(db, 'player')
const recordColRef = collection(db, 'record')

// queries
//const q = query(playerColRef, where("key", "==", "value"))

// [ Cloud Firestore의 문서 생성 ]
export const addRecordDoc = async (recordValue) => {
    try {
        const docRef = await addDoc(recordColRef, recordValue);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
//console.log("createCollectionDoc()", createCollectionDoc())

// [실시간 Player 컬렉션 문서들 읽기]
export const getPlayerCollectionDoc = async () => {
    let playerArr = [];
    try {
        return new Promise((resolve, reject) => {
            onSnapshot(playerColRef, (snapshot) => {
                snapshot?.forEach((doc) => {
                    playerArr.push({ ...doc.data(), id: doc.id });
                });
                resolve(playerArr);
            });
        });
    } catch (err) {
        console.error("Error adding document: ", err);
        return Promise.reject(err);
    }
};

//getPlayerCollectionDoc();

const updatePlayerByRecord = () => {
    let recoredArr = []
    try {
        onSnapshot(recordColRef, (snapshot) => {
            const updates = [];

            snapshot?.forEach((docData) => {
                let recordDoc = doc(db, "record", docData.id)
                let winnerDoc = doc(db, "player", docData.data().winner)
                let loserDoc = doc(db, "player", docData.data().loser)

                if (docData.data()?.update !== true) {
                    console.log("docData.data()", docData.data())
                    updates.push(
                        {
                            ref: recordDoc,
                            update: { update: true },
                        },
                        {
                            ref: winnerDoc,
                            update: { win: increment(1) },
                        },
                        {
                            ref: loserDoc,
                            update: { lose: increment(1) },
                        },
                        )
                }

                recoredArr.push({ ...docData.data(), id: docData.id })
            });
            const batch = writeBatch(db)
            updates.forEach(update => batch.update(update.ref, update.update))
            batch.commit().then(updates.length = 0);

            //console.log("recoredArr", recoredArr)
        });
        return recoredArr;
    } catch (err) {
        console.error("Error adding document: ", err);
    }
}

updatePlayerByRecord()
