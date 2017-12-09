export const jobTags = [
  {
    type: "industry",
    codes: ["hotel", "restaurant", "bar", "clubnight", "clubmembers", "travel"]
  },
  // {
  //   type: "role",
  //   codes: ["barista", "bartender", "housekeeper"]
  // },
  {
    type: "commitment",
    codes: ["fulltime", "parttime", "freelance"]
  }
];

export const jobTagTranslations = {
  type: {
    industry: {
      "en": "Industry",
      "zh-HK": "行業"
    },
    // role: {
    //   "en": "Role",
    //   "zh-HK": "崗位"
    // },
    commitment: {
      "en": "Commitment",
      "zh-HK": "工作時間"
    }
  },
  code: {
    hotel: {
      "en": "Hotel",
      "zh-HK": "酒迨"
    },
    restaurant: {
      "en": "Restaurant",
      "zh-HK": "餐廳"
    },
    bar: {
      "en": "Bar",
      "zh-HK": "酒吧"
    },
    clubnight: {
      "en": "Night club",
      "zh-HK": "夜總會"
    },
    clubmembers: {
      "en": "Members club",
      "zh-HK": "會員俱樂部"
    },
    "travel": {
      "en": "Tourism",
      "zh-HK": "旅遊"
    }
  }
};