import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location'; //location 관련 api 추가
import { StyleSheet, Text, View, ScrollView, Dimensions, pagingEnabled, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';

const windowWidth = Dimensions.get('window').width; // = cconst {width: SCREEN_WIDTH } = Dimensions.get('window');와 같다

export default function App() {
  const [city, setCity] = useState("Loading..."); // 값이 반환 되기 전에 loading 이라고 뜸
  const [ok, setOk] = useState(true); //ok 여부 받기
  const [days, setDays] = useState([]); //날씨를 저장

  const API_KEY = '09a5c8b544473c48931574029389b823'; //원래는 서버에 두는 것이 더 안전함.
  
  const getWeather = async() => { //유저의 위치를 불러오는 것을 허락을 받는 메서드
    const {granted} = await Location.requestForegroundPermissionsAsync(); //안에 있는 것을 불러올 땐  {}를 사용
    if(!granted){ //grant 받지 않았을 경우, false로 볌경
      setOk(false);
    }

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5}); //유저의 좌표 가져오기
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false} //좌표로 현재 위치 반환하기
    );

    setCity(location[0].city) //도시명 반환, 배열 형태임
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    ); //날씨 api 받기
    const json = await response.json(); //response를 json 형태로 받기
    setDays(json.daily); //json 안에 있는 daily를 가져와서 days로 셋팅해주기
  
  }
  
  useEffect(() => {
    getWeather();
  },[]) //맨 처음 랜더링 될 때 한 번만 실행됨

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled //불필요한 스크롤 넘김을 방지하는 페이지 네이션 사용
        horizontal
        showsHorizontalScrollIndicator={true} //스크롤 인디케이터 표시 여부
        indicatorStyle={'white'} //ios 에서만 동작
        contentContainerStyle={styles.weather}
        >
          {days.length === 0 ? ( //days의 길이가 0이면 ActivityIndicator 반환
            <View style={styles.day}>
              <ActivityIndicator
                color="white" //색깔은 흰색
                styles={{marginTop: 10}} //위로 10
                size="large" //크기는 large
                />
            </View>
            ) : (
              days.map((day, index) =>
              <View key={index} styles={styles.day}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View> //소수점 첫째 자리까지만 보여줌
              )
            )}
      <StatusBar></StatusBar>
      </ScrollView>
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

  tinyText:{
    fontSize: 20,
  }
});

//웹에서는 스크롤이 가능, 앱은 아님
//그래서 ScrollView 컴포넌트를 사용해야하고 수평으로 스크롤 하고 싶으면 Horizontal을 써준다
// 그리고 스크롤뷰의 스타일은 contentContainerStyle을 사용해야 한다.
// 스크롤 뷰에서 FLEX는 사용 안함
