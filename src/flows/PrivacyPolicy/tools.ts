import { uiStore } from 'store';

export const onLinkClick = (
  event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
): void => {
  if ('getAttribute' in event.target)
    if (
      (event.target as Element)
        .getAttribute('href')
        ?.toLocaleLowerCase()
        .includes('termsofuse')
    ) {
      event.preventDefault();
      uiStore.deactivateFlow('privacyPolicy');
      uiStore.activateFlow('termsOfUse');
    }
};
