import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Tokyo</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
      <StatusBar></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  //전체 컨테이너 CSS
  container: {
    flex: 1,
    backgroundColor:"lightpink",
  },
  //도시 컨터이너 CSS
  city: {
    flex:1.2,
    justifyContent:"center",
    alignItems:"center",
  },
  //도시 이름 css
  cityName:{
    fontSize:68,
    fontWeight:"500"
  },

  //날씨 컨테이너 CSS
  weather:{
    flex: 3,
  },

  day:{
    flex: 1,
    alignItems:"center",
  },

  temp:{
    marginTop: -30,
    fontSize: 168,
  },

  description:{
    fontSize: 60,
  },
});

