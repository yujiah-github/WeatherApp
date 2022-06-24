import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location'; //location 관련 api 추가
import { StyleSheet, Text, View, ScrollView, Dimensions, pagingEnabled } from 'react-native';
import React, { useEffect, useState } from 'react';

const windowWidth = Dimensions.get('window').width; // = cconst {width: SCREEN_WIDTH } = Dimensions.get('window');와 같다

export default function App() {
  const [location, setLocation] = useState(); //현재 위치 받기
  const [ok, setOk] = useState(true); //ok 여부 받기

  const ask = async() => { //유저의 위치를 불러오는 것을 허락을 받는 메서드
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){ //grant 받지 않았을 경우, false로 볌경
      setOk(false);
    }

    const location = await Location.getCurrentPositionAsync({accuracy:5});
    console.log(location);
  }
  
  useEffect(() => {
    ask();
  },[]) //맨 처음 랜더링 될 때 한 번만 실행됨

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Tokyo</Text>
      </View>
      <ScrollView
        pagingEnabled //불필요한 스크롤 넘김을 방지하는 페이지 네이션 사용
        horizontal
        showsHorizontalScrollIndicator={true} //스크롤 인디케이터 표시 여부
        indicatorStyle={'white'} //ios 에서만 동작
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar></StatusBar>
    </View>
  );
}

//웹에서는 스크롤이 가능, 앱은 아님
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
    
  },

  //설정할 때 숫자 지양
  day:{
    width: windowWidth,
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

//웹에서는 스크롤이 가능, 앱은 아님
//그래서 ScrollView 컴포넌트를 사용해야하고 수평으로 스크롤 하고 싶으면 Horizontal을 써준다
// 그리고 스크롤뷰의 스타일은 contentContainerStyle을 사용해야 한다.
// 스크롤 뷰에서 FLEX는 사용 안함
