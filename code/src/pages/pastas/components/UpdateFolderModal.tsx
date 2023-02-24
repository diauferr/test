import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { Input } from '../../../components/_inputs/Input';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { FolderContext } from '../context/FolderContextProvider';
import { IFolderContextProviderValue } from '../context/IFolderContextProviderValue';
import { FolderModel } from '../../../models/folder/FolderModel';
import { useRenameFolder } from '../hooks/useRenameFolder';
import { useCreateFolder } from '../hooks/useCreateFolder';

interface IProps {
  visible: boolean;
  onCancel: () => any;
}

export const UpdateFolderModal = ({ visible, onCancel }: IProps) => {
  const ctx = useContext<IFolderContextProviderValue>(FolderContext as any);
  const [renameFolder, loadingRenameFolder] = useRenameFolder(onCancel);
  const [createFolder, loadingCreateFolder] = useCreateFolder(onCancel);
  const { currentFolder } = ctx.state;
  const inputRef = useRef();
  const [folderName, setFolderName] = useState<string>('');
  const isCreating = currentFolder === FolderModel.Empty;
  const loading = loadingRenameFolder || loadingCreateFolder;

  useLayoutEffect(() => {
    if (currentFolder) {
      setFolderName(currentFolder.name);
    } else {
      setFolderName('');
    }

    setTimeout(() => {
      if (inputRef.current) {
        //@ts-ignore
        inputRef.current.focus();
      }
    }, 50);
  }, [visible]);

  const confirmAction = useCallback(() => {
    if (`${folderName}`.trim().length === 0) return;

    if (isCreating) {
      createFolder(folderName);
    } else {
      renameFolder(currentFolder.id, folderName);
    }
  }, [currentFolder, folderName]);

  return (
    <Modal
      title={isCreating ? 'Adicionar nova pasta' : 'Renomear pasta'}
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      maskClosable={false}
      footer={[
        <Button onClick={onCancel} key={'btn-cancelar'} disabled={loading}>
          Cancelar
        </Button>,
        <Button
          type={'primary'}
          key={'btn-alterar'}
          loading={loading}
          disabled={folderName.trim().length === 0}
          onClick={confirmAction}>
          {' '}
          {isCreating ? 'Adicionar' : 'Alterar'}{' '}
        </Button>
      ]}>
      <div style={{ padding: '1rem' }}>
        <Input
          placeholder="Nome da pasta"
          value={folderName}
          onChange={(evt) => setFolderName(evt.target.value)}
          ref={inputRef}
          disabled={loading}
          onPressEnter={confirmAction}
        />
      </div>
    </Modal>
  );
};
