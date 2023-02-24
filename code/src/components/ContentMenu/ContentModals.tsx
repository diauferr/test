import React from 'react';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { FolderSelectionModal } from './FolderSelection/FolderSelectionModal';
import { QuoteModal } from './QuoteModal/QuoteModal';
import { ModalState } from './useContentModalState';

interface IProps {
  result: ContentSearchResult;
  state: ModalState;
  onClose: () => any;
}

export const ContentModals = ({ result, state, onClose }: IProps) => {
  if (!result || result === ContentSearchResult.Empty) return null;

  return (
    <>
      <FolderSelectionModal
        result={result}
        visible={state.folderModal}
        onCancel={onClose}
      />

      {/* <ShareByEmailModal
				result={result}
				visible={state.emailModal}
				onCancel={onClose}
			/> */}

      <QuoteModal
        visible={state.quoteModal}
        onCancel={onClose}
        contentId={result.id}
        contentId2={result.editionId}
        contentType={result.contentType}
      />
    </>
  );
};
