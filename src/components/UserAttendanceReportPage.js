
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

const UserAttendanceReportPage = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setAttendance(docSnap.data().attendance || []);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <View>
      <FlatList
        data={attendance}
        renderItem={({ item }) => (
          <View>
            <Text>Date: {item.date}</Text>
            <Text>Sign In Time: {item.signInTime || 'Absent'}</Text>
            <Text>Sign Out Time: {item.signOutTime || 'Not Signed Out'}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default UserAttendanceReportPage;
