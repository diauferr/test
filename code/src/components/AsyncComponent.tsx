import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Loading } from './_shell/Loading';

interface IProps {
  error?: any;
  renderError?: (error: any) => any;
  renderContent: () => any;
  loading: boolean;
  renderPlaceholder?: () => any;
}

export const AsyncComponent = ({
  error,
  renderError,
  renderContent,
  loading,
  renderPlaceholder
}: IProps) => {
  if (error)
    return renderError ? renderError(error) : <ErrorMessage error={error} />;

  if (loading) return renderPlaceholder ? renderPlaceholder() : <Loading />;

  return renderContent();
};
