import React from "react";
import {uiStore} from "../store";

enum AttributeData {
  TERMS_OF_USE = 'termsOfUse',
  PRIVACY_POLICY = 'privacyPolicy'
}

const FIRST_ELEMENT = 1;

export  const onLinkClick = (
  event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
): void => {
  if ('getAttribute' in event.target) {
    const flowName = (event.target as Element).getAttribute('href')?.slice(FIRST_ELEMENT);

    if (
      (event.target as Element)
        .getAttribute('href')
        ?.toLocaleLowerCase()
        .includes(AttributeData.TERMS_OF_USE === flowName ?
          AttributeData.TERMS_OF_USE.toLocaleLowerCase() :
          AttributeData.PRIVACY_POLICY.toLocaleLowerCase())) {
      event.preventDefault();

      uiStore.deactivateFlow(AttributeData.TERMS_OF_USE === flowName ?
        AttributeData.PRIVACY_POLICY : AttributeData.TERMS_OF_USE);

      uiStore.activateFlow(AttributeData.TERMS_OF_USE === flowName ?
        AttributeData.TERMS_OF_USE : AttributeData.PRIVACY_POLICY);
    }
  }
};
