import React, { useContext, useState, useEffect, useRef } from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import styled from 'styled-components';

import IconHide from '../../../../assets/see-more.svg';
import iconShow from '../../../../assets/see-less.svg';
import iconAuthor from '../../../../assets/icon-author.svg';
import iconDate from '../../../../assets/icon-date.svg';

import { CardMenu } from '../cardMenu';

type Props = {
    text: string;
};

const TextWithPopup: React.FC<Props> = ({ text }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseEnter = () => {
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <span style={{ position: 'relative' }}>
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {text.length > 14 ? text.slice(0, 14) + '...' : text}
            </span>
            {showPopup && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: '#eee',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        minWidth: '50px',
                        zIndex: 1,
                        width: 'auto'
                    }}>
                    {text}
                </div>
            )}
        </span>
    );
};

const TextExpanderT: React.FC<Props> = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (text.length > 30) {
            setShowButton(true);
        }
    }, [text]);

    return (
        <div>
            {text.length > 30 ? (
                <CardTextHided>
                    <p
                        style={{
                            margin: '0 0 8px 0',
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            height: expanded || !showButton ? 'auto' : '2em'
                        }}>
                        {text}
                    </p>
                    <div className="overlay"></div>
                    {showButton && (
                        <button onClick={() => setExpanded(!expanded)}>
                            {expanded ? (
                                <div>
                                    <img src={iconShow} alt="" />
                                    ver menos
                                </div>
                            ) : (
                                <div>
                                    <img src={IconHide} alt="" />
                                    ver mais
                                </div>
                            )}
                        </button>
                    )}
                </CardTextHided>
            ) : (
                <CardTextShowed
                    style={{ height: '57.2px', fontWeight: 'bold' }}>
                    {text}
                </CardTextShowed>
            )}
        </div>
    );
};

const TextExpanderP: React.FC<Props> = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (text.length > 50) {
            setShowButton(true);
        }
    }, [text]);

    return (
        <div>
            {text.length > 50 ? (
                <CardTextHided>
                    <p
                        style={{
                            margin: '0 0 8px 0',
                            overflow: 'hidden',
                            height: expanded || !showButton ? 'auto' : '2em'
                        }}>
                        {text}
                    </p>
                    <div className="overlay"></div>
                    {showButton && (
                        <button onClick={() => setExpanded(!expanded)}>
                            {expanded ? (
                                <div>
                                    <img src={iconShow} alt="" />
                                    ver menos
                                </div>
                            ) : (
                                <div>
                                    <img src={IconHide} alt="" />
                                    ver mais
                                </div>
                            )}
                        </button>
                    )}
                </CardTextHided>
            ) : (
                <CardTextShowed style={{ height: '57.2px' }}>
                    {text}
                </CardTextShowed>
            )}
        </div>
    );
};

export function Card({
    itemId,
    selected,
    onClick,
    cover,
    tag,
    title,
    author,
    date,
    desc,
    link
}: {
    itemId: string;
    selected: boolean;
    onClick: Function;
    tag: string;
    title: string;
    cover: string;
    author: string;
    date: string;
    desc: string;
    link: string;
}) {
    const visibility = useContext(VisibilityContext);

    const visible = visibility.isItemVisible(itemId);

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    console.log(cover);

    return (
        <Container
            onClick={() => onClick()}
            role="button"
            style={{
                border: '1px solid #eee',
                cursor: 'pointer',
                display: 'inline-block',
                margin: '0 16px 0 0',
                width: '240px',
                minHeight: '500px',
                userSelect: 'none',
                borderRadius: '10px',
                padding: '31px',
                marginTop: hover ? '-12px' : '0px',
                boxShadow: hover
                    ? '0px 4px 12px -4px rgba(0,0,0,0.15)'
                    : 'none',
                MozBoxShadow: hover
                    ? '0px 4px 12px -4px rgba(0,0,0,0.15)'
                    : 'none',
                WebkitBoxShadow: hover
                    ? '0px 4px 12px -4px rgba(0,0,0,0.15)'
                    : 'none',
                transition: 'margin 0.2s ease-in'
            }}
            tabIndex={0}
            className="card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <CardCover src={cover} />
            <CardTag>{tag}</CardTag>
            <TextExpanderT text={title} />
            <CardAuthor>
                <img src={iconAuthor} alt="" />
                {/* {author} */}
                <TextWithPopup text={author} />
            </CardAuthor>
            <CardDate>
                <img src={iconDate} alt="" />
                {date}
            </CardDate>
            <TextExpanderP text={desc} />
            <CardMenu />
        </Container>
    );
}

const Container = styled.div``;

const CardCover = styled.img`
    width: 180px;
    height: 260px;
    border-radius: 8px;
    margin-bottom: 8px;
`;

const CardTag = styled.div`
    width: fit-content;
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    color: #fff;
    background-color: #004c92;
    margin-bottom: 8px;
`;

const CardTitle = styled.h4`
    color: #333333;
`;

const CardAuthor = styled.div`
    color: #003a70;
    margin-bottom: 8px;
    img {
        margin-left: 3px;
        margin-right: 4px;
        width: 16px;
    }
`;

const CardDate = styled.div`
    color: #003a70;
    margin-bottom: 8px;
    img {
        width: 20px;
        margin-right: 4px;
    }
`;

const CardDesc = styled.p`
    color: #333333;
`;

const CardTextHided = styled.div`
    button {
        background-color: #fff;
        border: solid 1px red;
        border-radius: 4px;
        cursor: pointer;
        color: #d7282f;
        font-size: 12px;
        margin-bottom: 8px;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        img {
            width: 12px;
            margin-right: 4px;
        }
    }
`;

const CardTextShowed = styled.div`
    margin-bottom: 8px;
`;
