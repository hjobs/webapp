import React from 'react';
import Reflux from 'reflux';
import { ShareButtons, generateShareIcon } from 'react-share';
const { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } = ShareButtons;
const socialButtons = [
  {type: FacebookShareButton, key: "facebook"},
  {type: LinkedinShareButton, key: "linkedin"},
  {type: TwitterShareButton, key: "twitter"},
  {type: WhatsappShareButton, key: "whatsapp"},
]
import CopyToClipboard from 'react-copy-to-clipboard';
import './styles/ShareButtons.css'

import TranslationStore from '../../stores/translationStore';
import { log } from '../../services/http';

const tStrings = {
  "en": {
    shareIn: "Share in",
    or: "or",
    copyToClipboard: "copy link",
    copied: "Copied!"
  },
  "zh-HK": {
    shareIn: "分享",
    or: "或",
    copyToClipboard: "複製連結",
    copied: "已複製!"
  }
}

export default class ActionButtons extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = TranslationStore;
    this.storeKeys = ["locale"];
    this.shareButtonLog = (key) => ({
      name: "Share",
      action: "Click",
      page: "ApplyModal",
      component: "ShareButtons",
      target: key,
      job_id: !!props.job ? props.job.id : null
    });
  }

  render() {
    if (!this.props.job) return null;
    const { job } = this.props,
          t = tStrings[this.state.locale],
          link = "https://www.hjobs.hk/jobs/stable?job=" + job.id;

    return (
      <div className="flex-row flex-hCenter flex-vEnd" style={this.props.style}>
        <div>
          {t.shareIn}:
        </div>
        {
          socialButtons.map((item, i) => React.createElement(
            "div",
            {
              key: "socialbuttons-" + item.key,
              onClick: () => log(this.shareButtonLog(item.key))
            },
            React.createElement(
              item.type,
              {
                className: "padded-sides social-button",
                url: link,
                title: job.title,
                description: job.description,
                picture: job.photo || job.orgs[0].logo,
                hashtags: ["hjobs"],
                separator: " - from HJobs - "
              },
              React.createElement(
                generateShareIcon(item.key),
                {
                  round: true,
                  size: 22
                }
              )
            )
          ))
        }
        <div className="padded-sides">, {t.or}</div>
        <div>
          <CopyToClipboard text={link}>
            <span className="link" onClick={() => {
              log(this.shareButtonLog("copyLink"))
              alert(t.copied);
            }}>{t.copyToClipboard}</span>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}
