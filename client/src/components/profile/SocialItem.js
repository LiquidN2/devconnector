import React from 'react';

import { shortenUrl } from './../../utils/shortenString';

const SocialItem = props => {
  let classNameIcon;
  let urlPrefix;
  switch (props.urlType) {
    case 'handle':
      classNameIcon = 'fas fa-code';
      urlPrefix = '/user/';
      break;

    case 'github':
      classNameIcon = 'fab fa-github';
      urlPrefix = 'http://github.com/';
      break;

    case 'email':
      classNameIcon = 'fas fa-at';
      urlPrefix = 'mailto:';
      break;

    case 'website':
      classNameIcon = 'fas fa-globe';
      urlPrefix = 'http://';
      break;

    case 'linkedin':
      classNameIcon = 'fab fa-linkedin-in';
      urlPrefix = 'http://';
      break;

    case 'facebook':
      classNameIcon = 'fab fa-facebook-f';
      urlPrefix = 'http://';
      break;

    case 'twitter':
      classNameIcon = 'fab fa-twitter';
      urlPrefix = 'http://';
      break;

    case 'instagram':
      classNameIcon = 'fab fa-instagram';
      urlPrefix = 'http://';
      break;

    case 'youtube':
      classNameIcon = 'fab fa-youtube';
      urlPrefix = 'http://';
      break;


    default:
      classNameIcon = '';
  }

  const urlLink = `${urlPrefix}${props.urlValue}`;
  const urlLabel = shortenUrl(props.urlValue);

  return (
    <a href={urlLink} className="profile-base__socials-link link--standard" target="_blank" rel="noopener noreferrer">
      <span className="profile-base__socials-logo"><i className={classNameIcon}></i></span>
      {urlLabel}
    </a>
  );
};

export default SocialItem;