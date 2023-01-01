export const colors = {
  dark: {
    primary: '#000000',
    primaryText: '#FFFFFF',
    text: '#FFFFFF',
    subText: '#bfbfbf',
    primaryGrayColor: '#70757a',
    secondaryGrayColor: '#e2e3e4',
    border: '#262935',
    bg: '#12141d',
    card: '#1c1e28',
  },
  light: {
    primary: '#000000',
    primaryText: '#FFFFFF',
    text: '#000000',
    subText: '#70757a',
    primaryGrayColor: '#70757a',
    secondaryGrayColor: '#e2e3e4',
    border: '#e9ebed',
    bg: '#f9f9f9',
    card: '#ffffff',
  },
};

export const dynamicColors = (isDark: boolean) => ({
  primary: isDark ? colors.dark.primary : colors.light.primary,
  primaryText: isDark ? colors.dark.primaryText : colors.light.primaryText,
  subText: isDark ? colors.dark.subText : colors.light.subText,
  text: isDark ? colors.dark.text : colors.light.text,
  primaryGrayColor: isDark ? colors.dark.primaryGrayColor : colors.light.primaryGrayColor,
  secondaryGrayColor: isDark ? colors.dark.secondaryGrayColor : colors.light.secondaryGrayColor,
  border: isDark ? colors.dark.border : colors.light.border,
  bg: isDark ? colors.dark.bg : colors.light.bg,
  card: isDark ? colors.dark.card : colors.light.card,
});
