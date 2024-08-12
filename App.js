import React, { Fragment } from 'react';
import PushController from './PushController'; // Ensure this path is correct
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';

// Dummy data for list, we'll replace this with data received from push
let pushData = [
  {
    title: "First push",
    message: "First push message"
  },
  {
    title: "Second push",
    message: "Second push message"
  }
];

const _renderItem = ({ item }) => (
  <View key={item.title}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
  </View>
);

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              data={pushData}
              renderItem={_renderItem} // Fixed to use the correct reference
              keyExtractor={(item) => item.title}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <PushController /> {/* Ensure PushController is rendered */}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: "white" },
  listHeader: { backgroundColor: '#eee', color: "#222", height: 44, padding: 12 },
  title: { fontSize: 18, fontWeight: 'bold', paddingTop: 10 },
  message: { fontSize: 14, paddingBottom: 15, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  body: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10 },
});

export default App;
