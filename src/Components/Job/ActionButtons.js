import React from 'react';
import Reflux from 'reflux';
import { ShareButtons, generateShareIcon } from 'react-share';
const { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } = ShareButtons;
const FacebookShareIcon = generateShareIcon("facebook");
const LinkedinShareIcon = generateShareIcon("linkedin");
const TwitterShareIcon = generateShareIcon("twitter");
const WhatsappShareIcon = generateShareIcon("whatsapp");
const socialButtons = [
  {type: FacebookShareButton, children: FacebookShareIcon},
  {type: LinkedinShareButton, children: LinkedinShareIcon},
  {type: TwitterShareButton, children: TwitterShareIcon},
  {type: WhatsappShareButton, children: WhatsappShareIcon},
]
import CopyToClipboard from 'react-copy-to-clipboard';
import './styles/ActionButtons.css'

import TranslationStore from '../../stores/translationStore';

const tStrings = {
  "en": {
    shareIn: "Share in",
    or: "or",
    copyToClipboard: "copy link"
  },
  "zh-HK": {
    shareIn: "分享",
    or: "或",
    copyToClipboard: "複製連結"
  }
}

export default class ActionButtons extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = TranslationStore;
    this.storeKeys = ["locale"];
  }

  render() {
    if (!this.props.job) return null;
    const t = tStrings[this.state.locale],
          link = "https://www.hjobs.hk/jobs/stable?job=" + this.props.job.id;

    return (
      <div className="flex-row flex-hCenter flex-vEnd" style={this.props.style}>
        <div>
          {t.shareIn}:
        </div>
        { socialButtons.map((item, i) => React.createElement(
          item.type,
          {
            className: "padded-sides social-button",
            key: "socialbuttons-" + i,
            url: link
          },
          React.createElement(
            item.children,
            {
              round: true,
              size: 22
            }
          )
        ) )}
        <div className="padded-sides">, {t.or}</div>
        <div>
          <CopyToClipboard text={link}>
            <span className="link">{t.copyToClipboard}</span>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}
