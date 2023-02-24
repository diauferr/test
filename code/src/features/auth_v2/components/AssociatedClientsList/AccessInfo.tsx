import React from 'react';
import { AssociatedBy } from '../../model/AssociatedBy.enum';

export const AccessInfo: React.FC<{
  associated_by: AssociatedBy;
  blocked: boolean;
}> = ({ associated_by, blocked }) => {
  let text = '';

  if (blocked) {
    text = 'Acesso bloqueado ou expirado';
  } else {
    switch (associated_by) {
      case AssociatedBy.Domain:
        text = 'Institucional';
        break;

      case AssociatedBy.Intranet:
        text = 'Intranet';
        break;
      case AssociatedBy.ContractManager:
        text = 'Gestor do contrato';
        break;

      case AssociatedBy.Invite:
        text = 'Você foi convidado para esta conta';
        break;
      default:
        break;
    }
  }

  return <span className="access-info">{text}</span>;
};
