import { useEffect, useCallback } from 'react';
import { keys } from '../../constants';

const KEYDOWN_EVENT = 'keydown';

export const useKeyPress = (targetKey: string, onPress: () => void): void => {
  const handlePress = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        onPress();
      }
    },
    [targetKey, onPress],
  );

  useEffect(() => {
    window.addEventListener(KEYDOWN_EVENT, handlePress);

    return () => {
      window.removeEventListener(KEYDOWN_EVENT, handlePress);
    };
  }, [handlePress]);
};

export const useEscKeyPress = (onPress: () => void): void =>
  useKeyPress(keys.ESC, () => onPress());

export const useEnterKeyPress = (onPress: () => void): void =>
  useKeyPress(keys.Enter, () => onPress());
