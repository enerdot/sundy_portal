const regionLabel = {
    seoul: '서울경기',
    chungnam: '충남',
    jeonbuk: '전북',
    jeonnam: '전남',
    gangwon: '강원',
    chungbuk: '충북',
    gyeongbuk: '경북',
    gyeongnam: '경남',
    jeju: '제주',
}

const regionLinkUrl = {
    seoulAndGyeonggiDo: 'seoul',
    chungnam: 'chungnam',
    jeonbuk: 'jeonbuk',
    jeonnam: 'jeonnam',
    gangwon: 'gangwon',
    chungbuk: 'chungbuk',
    gyeongbuk: 'gyeongbuk',
    gyeongnam: 'gyeongnam',
    jeju: 'jeju',
}

const regionOptions = [
    {label: "서울경기", value: "seoul"},
    {label: "충남", value: "chungnam"},
    {label: "전북", value: "jeonbuk"},
    {label: "전남", value: "jeonnam"},
    {label: "강원", value: "gangwon"},
    {label: "충북", value: "chungbuk"},
    {label: "경북", value: "gyeongbuk"},
    {label: "경남", value: "gyeongnam"},
    {label: "제주", value: "jeju"},
]

const apiRegionLabel = {
    1: '서울경기',
    2: '강원',
    3: '충북',
    4: '충남',
    5: '전북',
    6: '전남',
    7: '경북',
    8: '경남',
    9 : '제주',
}

const reverseRegionLabel = {
    서울경기: 'seoul',
    서울 : 'seoul',
    경기 : 'seoul',
    충남: 'chungnam',
    전북: 'jeonbuk',
    전남: 'jeonnam',
    강원: 'gangwon',
    충북: 'chungbuk',
    경북: 'gyeongbuk',
    경남: 'gyeongnam',
    제주: 'jeju',
}

export {regionLabel, apiRegionLabel, regionOptions, reverseRegionLabel, regionLinkUrl}