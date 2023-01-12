const getColors = (isLight: boolean) => {
  const colors = {
    'primary-bg': isLight ? '#FAF9F8' : '#FAF9F8', // ORIGINAL
    'secondary-bg': isLight ? '#FFFFFF' : '#FFFFFF',
    'ternary-bg': isLight ? '#F7F6F6' : '#F7F6F6',
    'tab-bg': isLight ? '#FFFFFF' : '#FFFFFF',
    //
    'primary-border': isLight ? '#CBD1DA' : '#CBD1DA',
    'primary-border-opacity': isLight ? '#CBD1DA40' : '#CBD1DA40',
    'primary-color': isLight ? '#6C380C' : '#6C380C',
    'primary-color-bright': isLight ? '#EBC9AC' : '#EBC9AC',
    'primary-color-bright-opacity': isLight ? '#fef8f4' : '#fef8f4',
    'primary-color-opacity': isLight ? '#6C380C08' : '#6C380C08',
    //
    'primary-button-text': isLight ? '#FFFFFF' : '#FFFFFF',
    'primary-text': isLight ? '#5A5043' : '#5A5043',
    'primary-inverted-text': isLight ? '#FFFFFF' : '#FFFFFF',
    'secondary-text': isLight ? '#6E7F98' : '#6E7F98',
    'sub-text': isLight ? '#BDBDBD' : '#BDBDBD',
    'bg-opacity': isLight ? '#BDBDBD26' : '#BDBDBD26',
    //

    icon: isLight ? '#C4C4C4' : '#C4C4C4',
    'search-bar': isLight ? '#F2F1F0' : '#F2F1F0',
  };
  return colors;
};

export default getColors;
