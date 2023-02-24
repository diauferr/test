import React from 'react';

import styled from 'styled-components';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import ArrowLeftIcon from '../../../../assets/icon-arrow-left.svg';
import ArrowRightIcon from '../../../../assets/icon-arrow-right.svg';

export function ArrowLeft() {
    const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
        React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleElements.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleElements]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollPrev()}>
            <img
                src={ArrowLeftIcon}
                alt={ArrowLeftIcon}
                draggable={false}
                style={{ width: '8px' }}
            />
        </Arrow>
    );
}

export function ArrowRight() {
    const { isLastItemVisible, scrollNext, visibleElements } =
        React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !visibleElements.length && isLastItemVisible
    );
    React.useEffect(() => {
        if (visibleElements.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleElements]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollNext()}>
            <img
                src={ArrowRightIcon}
                alt={ArrowRightIcon}
                draggable={false}
                style={{ width: '8px' }}
            />
        </Arrow>
    );
}

const Arrow = ({
    children,
    disabled,
    onClick
}: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
}) => (
    <Container
        disabled={disabled}
        onClick={onClick}
        style={{
            opacity: disabled ? '0' : '1'
        }}>
        {children}
    </Container>
);

const Container = styled.button`
    cursor: "pointer";
    display: "flex";
    flex-direction: "column";
    justify-content: "center",
    right: "1%",
    userSelect: "none",
    backdrop-filter: blur(10px);
    border: none;
    background: transparent;
    transition all 0.3s ease;
    &:active { 
      border-style: none;
      background-color: white;
      background: white;
    }
`;
