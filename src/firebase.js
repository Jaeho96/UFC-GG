import { firebaseConfig } from './env';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { ref, set, push, onValue } from "firebase/database";

// init firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

//export default app;
const db = getDatabase(app);

// 사용자 정보 저장
export const saveUser = (userId, userData) => {
  set(ref(db, `users/${userId}`), userData);
};
  
// 사용자 점수 저장
export const saveScore = (userId, scoreData) => {
  push(ref(db, `scores/${userId}`), scoreData);
};

// 사용자 읽어오기
export const getUsers = (callback) => {
    onValue(ref(db, `users`), (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val());
      });
      callback(users);
    });
  };
  
// 사용자 점수 읽어오기
export const getScores = (userId, callback) => {
  onValue(ref(db, `scores/${userId}`), (snapshot) => {
    const scores = [];
    snapshot.forEach((childSnapshot) => {
      scores.push(childSnapshot.val());
    });
    callback(scores);
  });
};

export default db;
