import Modal, { ModalProps } from '#/components/Modal';
import { createContext, useContext, useState } from 'react';

export type ModalType = {};

const Context = createContext<
  [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>]
>([{}, () => {}]);

export const ModalContext: React.FC<React.PropsWithChildren> = props => {
  const state = useState<ModalProps>({});

  return (
    <Context.Provider value={state}>
      {props.children}
      <Modal {...state[0]} />
    </Context.Provider>
  );
};

export const useModal = () => {
  const [get, set] = useContext(Context);

  const hide = () => {
    set(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const show = (params: ModalProps) => {
    set(prev => ({
      ...prev,
      ...params,
      visible: true,
    }));
  };

  return { hide, show };
};
