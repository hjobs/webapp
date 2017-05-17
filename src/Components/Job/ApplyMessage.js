import React from 'react';
import { getLocale } from '../../stores/translationStore';


const tStrings = {
  en: {
    hi: "Hi",
    intro: "When you confirm, you will be applying for this job, at the push of a button!",
    loggedIn: "You can change your profile (via the top toolbar) at any time, and changes are reflected immediately so that you do not have to worry about an oudated CV!",
    notLoggedIn: "Please sign in to our one-stop solution, applying to this and many other jobs, and easily building your most updated CV!",
    cheers: "Cheers!"
  },
  "zh-HK": {
    hi: "你好",
    intro: "當你確認後，我們會代你提交申請，即時通時有關僱主。",
    loggedIn: "你可以在提交申請後再到你的帳戶填寫你的工作紀驗等資料。你的僱主會看到你最新的資料，讓你能輕鬆管理你的履歷。",
    notLoggedIn: "請以下列方法登入或建立帳戶。成功後，你便可以使用我們的一站式平台輕鬆申請工作及建立履歷。",
    cheers: "Cheers!"
  }
}

const ApplyMessage = ({user}) => {
  const t = tStrings[getLocale()];
  return (
    <div style={{
      lineHeight: 1.5,
      padding: 15,
      fontSize: 16
    }}>
      <h3>{t.hi}{!!user ? " " + (user.first_name || user.name) : ""},</h3>
      <br />
      <p>
      {t.intro}<br /><br />
      {!!user ? t.loggedIn : t.notLoggedIn}<br /><br />
      {t.cheers}
      </p>
    </div>
  )
}

export default ApplyMessage;