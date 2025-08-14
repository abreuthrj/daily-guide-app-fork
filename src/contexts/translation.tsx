import { STORAGE } from '#/constants/storage';
import {
  ProjectsGroups,
  SourceStrings,
  StringTranslations,
} from '@crowdin/crowdin-api-client';
import { CROWDIN_PROJECT_ID, CROWDIN_TOKEN } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NativeModules, Platform } from 'react-native';

type TranslationContextType = {
  translations: Record<string, Record<string, string>>;
  translate: (key: string) => string;
  setLanguage: (language: string) => void;
  language: string;
};

let DEFAULT_LANGUAGE =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

DEFAULT_LANGUAGE = DEFAULT_LANGUAGE.includes('pt') ? 'pt-BR' : 'en';

const context = createContext<TranslationContextType>({
  translations: {},
  translate: () => '',
  setLanguage: () => {},
  language: DEFAULT_LANGUAGE,
});

const projectsGroupsApi = new ProjectsGroups({
  token: CROWDIN_TOKEN,
});

const projectSourceStrings = new SourceStrings({
  token: CROWDIN_TOKEN,
});

const projectTranslations = new StringTranslations({
  token: CROWDIN_TOKEN,
});

export const TranslationContext: React.FC<PropsWithChildren> = props => {
  const [state, setState] = useState<TranslationContextType['translations']>(
    {},
  );
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    fetchFromStorage().catch(console.log);

    fetchStrings().catch(err => {
      console.log('[CROWDIN ERROR]', err);
      crashlytics().recordError(
        new Error(typeof err === 'string' ? err : JSON.stringify(err)),
      );
    });
  }, []);

  const fetchFromStorage = async () => {
    const translations = await AsyncStorage.getItem(STORAGE.translations);

    if (translations) {
      setState(JSON.parse(translations));
    }
  };

  const fetchStrings = async () => {
    const project = await projectsGroupsApi.getProject(CROWDIN_PROJECT_ID);
    const projectStrings = await projectSourceStrings
      .withFetchAll()
      .listProjectStrings(project.data.id);

    const stateObject: Record<string, Record<string, string>> = {};

    await Promise.all(
      project.data.targetLanguages.map(async lang => {
        stateObject[lang.id] = {};

        const langTranslations = await projectTranslations
          .withFetchAll()
          .listLanguageTranslations(project.data.id, lang.id);

        langTranslations.data.forEach(translation => {
          const sourceString = projectStrings.data.find(
            sourceString => sourceString.data.id === translation.data.stringId,
          );

          if (sourceString) {
            stateObject[lang.id][sourceString.data.identifier] = (
              translation.data as any
            ).text;
          }
        });
      }),
    );

    await AsyncStorage.setItem(
      STORAGE.translations,
      JSON.stringify(stateObject),
    );

    setState(stateObject);
  };

  const translate = (key: string) => {
    return state?.[language]?.[key] || key;
  };

  return (
    <context.Provider
      value={{ translations: state, translate, language, setLanguage }}>
      {props.children}
    </context.Provider>
  );
};

export const useTranslation = (lang?: string) => {
  const { translations, translate, language, setLanguage } =
    useContext(context);

  useEffect(() => {
    if (lang) {
      setLanguage(lang);
    }
  }, [lang]);

  return { translations, translate, language };
};
