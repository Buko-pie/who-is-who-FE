import React from 'react';
import styled from 'styled-components';
import { SiTwitter, SiDiscord, SiFacebook, SiTelegram } from 'react-icons/si';

const IconsList = {
    twitter : {icon: SiTwitter, gradient: '144deg, #2e00fb, #0043fb, 50%,#3378ef'},
    discord : {icon: SiDiscord, gradient: '144deg, #AF40FF, #5B42F3, 50%,#db60fd'},
    facebook: {icon: SiFacebook, gradient: '144deg, #008deb, #0099eb, 50%,#0099eb'},
    telegram: {icon: SiTelegram, gradient: '144deg, #00DDEB, #00DDEB, 50%,#cbf0f2'},
};

type IconsListObjectKey = keyof typeof IconsList;

export const Btn = styled.button<{ gradient?: string}>`
    height: 2.8rem;
    width: 2.8rem;
    padding: 0.15rem;
    margin: 0 1rem 0 0;
    display: flex;
    align-items: center;
    background-image: linear-gradient( ${({gradient}) => gradient ?? '144deg,#AF40FF, #5B42F3, 50%,#00DDEB'});
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    border: 0;
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;

    &:hover &:active {
        outline: 0;
    }

    span {
        width: 100%;
        height: 100%;
        padding: 0.6rem 0.7rem;
        display: flex;
        align-items: center;
        background-color: rgb(5, 6, 45);
        border-radius: 50%;
        transition: 300ms;
    }

    &:hover span {
        background: none;
        padding: 0.4rem 0.5rem;
    }

`

export const ButtonIcon: React.FC<{ icon: string }> = ({icon}) => {
    const Icon = IconsList[icon as IconsListObjectKey];
    return(<>
        <Btn gradient={Icon.gradient}>
            <span>
                <Icon.icon size='5rem'/>
            </span>
        </Btn>
    </>)
};

export default ButtonIcon;