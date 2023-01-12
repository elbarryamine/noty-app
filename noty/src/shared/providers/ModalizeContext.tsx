import {ScrollView} from 'native-base';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Modalize, ModalizeProps, useModalize} from 'react-native-modalize';

type ModalizeContextType = {
  open: () => void;
  close: () => void;
  dispatchContent: (Content: JSX.Element) => void;
  dispatchProps: (props: ModalizeProps) => void;
};

type Props = {children: ReactNode};
const ModalizeContext = createContext<ModalizeContextType>(
  {} as ModalizeContextType,
);
export const useModalizeContext = () => useContext(ModalizeContext);

const ModalizeProvider = ({children}: Props) => {
  const {ref, open, close} = useModalize();
  const [content, setContent] = useState<ReactNode>(<></>);
  const [modalizeProps, setModalizeProps] = useState<ModalizeProps>(
    {} as ModalizeProps,
  );
  const dispatchContent = (Element: JSX.Element) => {
    setContent(Element);
  };

  const dispatchProps = (props: ModalizeProps) => {
    setModalizeProps(props);
  };

  const onClose = () => {
    close();
    setContent(<>{null}</>);
    setModalizeProps({
      adjustToContentHeight: true,
      modalHeight: undefined,
    } as ModalizeProps);
  };

  return (
    <ModalizeContext.Provider
      value={{
        close: onClose,
        open,
        dispatchContent,
        dispatchProps,
      }}>
      {children}
      <Modalize
        ref={ref}
        adjustToContentHeight={true}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
        childrenStyle={{paddingTop: 20}}
        rootStyle={{zIndex: 0}}
        {...modalizeProps}>
        <ScrollView>{content}</ScrollView>
      </Modalize>
    </ModalizeContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
});

export default ModalizeProvider;
