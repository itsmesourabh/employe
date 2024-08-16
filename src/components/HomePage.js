
import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { View, Button,Text } from 'react-native';
import { auth, db } from '../../src/config/firebaseConfig';


const checkIfSignedIn = async () => {
  const userDoc = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return data.attendance.some(entry => entry.date === today && entry.signInTime && !entry.signOutTime);
  }
  return false;
};
const signIn = async () => {
  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        attendance: []
      });
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    await updateDoc(userDoc, {
      attendance: arrayUnion({
        date: today,
        signInTime: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
const signOut = async () => {
  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const attendanceEntry = data.attendance.find(entry => entry.date === today);
      if (attendanceEntry && attendanceEntry.signInTime && !attendanceEntry.signOutTime) {
        await updateDoc(userDoc, {
          attendance: arrayUnion({
            ...attendanceEntry,
            signOutTime: new Date().toISOString()
          })
        });
      }
    }
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const today = new Date().toISOString().split('T')[0]; 

const HomePage = ({ navigation }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAttendance = async () => {
      const signedIn = await checkIfSignedIn();
      setIsSignedIn(signedIn);
    };

    checkAttendance();
  }, []);

  return (
    <View>
      <Text>{today}</Text>

      {!isSignedIn ? (
        <Button
          title="Sign In"
          onPress={async () => {
            await signIn();
            setIsSignedIn(true);
          }}
        />
      ) : (
        <Button
          title="Sign Out"
          onPress={async () => {
            await signOut();
            setIsSignedIn(false);
          }}
        />
      )}
      <Button
        title="View Report"
        onPress={() => navigation.navigate('UserAttendanceReportPage')}
      />
    </View>
  );
};

export default HomePage;
