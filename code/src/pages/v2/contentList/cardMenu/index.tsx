import React from 'react';

import IconFolder from '../../../../assets/icon-add-folder.svg';
import IconReference from '../../../../assets/icon-add-reference.svg';

import * as S from './styles';

export const CardMenu = () => (
    <S.Container>
        <S.ButtonFolder>
            <S.Icon src={IconFolder} />
            Adicionar à pasta
        </S.ButtonFolder>
        <S.ButtonReference>
            <S.Icon src={IconReference} />
            Ref. bibliográfica
        </S.ButtonReference>
    </S.Container>
);
