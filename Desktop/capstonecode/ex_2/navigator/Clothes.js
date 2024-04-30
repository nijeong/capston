// clothes.js
//아이콘 이미지 경로
const icons = {
    "민소매": require('../path/to/민소매 아이콘.png'),
    "반팔 티셔츠": require('../path/to/반팔 아이콘.png'),
    
  };
// 기온대별 옷차림 정보
const outfits = {
    "28+": {
      outerwear: "-",
      top: "민소매, 반팔 티셔츠",
      bottom: "반바지(핫팬츠), 짧은 치마",
      other: "민소매 원피스, 린넨 재질 옷"
    },
    "23-27": {
      outerwear: "-",
      top: "반팔 티셔츠, 얇은 셔츠, 얇은 긴팔 티셔츠",
      bottom: "반바지, 면바지",
      other: "-"
    },
    "20-22": {
      outerwear: "얇은 가디건",
      top: "긴팔 티셔츠, 셔츠, 블라우스, 후드티",
      bottom: "면바지, 슬랙스, 7부 바지, 청바지",
      other: "-"
    },
    "17-19": {
      outerwear: "얇은 니트, 얇은 가디건, 얇은 재킷, 바람막이",
      top: "후드티, 맨투맨",
      bottom: "긴바지, 청바지, 슬랙스, 스키니진",
      other: "-"
    },
    "12-16": {
      outerwear: "재킷, 가디건, 야상",
      top: "스웨트 셔츠(맨투맨), 셔츠, 기모 후드티",
      bottom: "청바지, 면바지",
      other: "스타킹, 니트"
    },
    "9-11": {
      outerwear: "재킷, 야상, 점퍼, 트렌치 코트",
      top: "-",
      bottom: "청바지, 면바지, 검은색 스타킹, 기모 바지, 레이어드",
      other: "니트"
    },
    "5-8": {
      outerwear: "(울)코트코트, 가죽 재킷",
      top: "-",
      bottom: "레깅스, 청바지, 두꺼운 바지, 기모",
      other: "스카프, 플리스, 내복, 니트"
    },
    "~4": {
      outerwear: "패딩, 두꺼운 코트",
      top: "-",
      bottom: "-",
      other: "누빔, 내복, 목도리, 장갑, 기모, 방한용품"
    }
  };
  
  // 기온에 따른 옷차림 반환 함수
  export const getOutfitForTemperature = (temperature) => {
    let outfit = null;
    // 기온대를 찾아서 해당하는 옷차림 반환
    Object.keys(outfits).forEach((range) => {
      const [min, max] = range.split("-");
      if (temperature >= parseInt(min) && temperature <= parseInt(max)) {
        outfit = outfits[range];
      }
    });
    return outfit;
  };
  
  export default outfits;
  
  