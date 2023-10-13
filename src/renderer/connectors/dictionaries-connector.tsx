import { AddDictionaryType, IPC_CONNECTOR_NAME, SelectedDictionariesType } from '@common';
import { Dictionaries } from '@components';
import { useAppDispatch } from '@hooks';
import { addDictionaryAction } from '@redux';

export const DictionariesConnector = () => {
  const dispatch = useAppDispatch();

  const chooseDictionary = async () => {
    const dictionaryPath = await window[IPC_CONNECTOR_NAME].chooseDictionary();

    return dictionaryPath;
  };

  const installDictionary = async (dictionary: AddDictionaryType, dictionaryPath: string) => {
    await window[IPC_CONNECTOR_NAME].installDictionary(dictionary, dictionaryPath);

    dispatch(addDictionaryAction(dictionary));
  };

  const checkDictionaries = async (dictionaries: SelectedDictionariesType) => {
    await window[IPC_CONNECTOR_NAME].checkDictionaries(dictionaries);
  };

  return <Dictionaries checkDictionaries={checkDictionaries} chooseDictionary={chooseDictionary} installDictionary={installDictionary} />;
};
