import { useContext } from 'react';
import { GlobalContext } from '../context/app';
import en from '../assets/dictionary/en';
import de from '../assets/dictionary/de';

const dictionary = {
  en,
  de
};

export const I18n = (key: string, options?: object): string => {
  const { locale } = useContext(GlobalContext);
  
  let text = dictionary[locale][key];

  if (!text) return key;

  if (options) {
    Object.keys(options).forEach(option => {
      text = text.replace(`#${option}`, options[option] );
    })
  }

  return text;
};