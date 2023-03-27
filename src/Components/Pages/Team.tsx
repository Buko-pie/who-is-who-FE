import { useEffect, useState } from 'react';
import { type, clear, pause } from '../Functions/type';
import styled from 'styled-components';
import { BoxesInBox } from '../Animated';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

const CRT = styled.div`
    height: calc(87ch * 0.8);
    font-size: max(
        1rem,
        2.2vmin
    ); /* Scale the font-size relative to the minimum screen dimension */
    position: relative;
    animation: on 2s linear;
    transition: all 0.5s;
    overflow: hidden;
    background: radial-gradient(#212121 60%, #181818);
    z-index: 1;

    &:before{
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url(${require('../../Assets/images/gold-black.png')});
        background-repeat: no-repeat;
        background-position: 100% 100%;
        pointer-events: none;
        opacity: 20%;
        z-index: 0;
    }

    @media (max-width: 1200px) {
        height: calc(95ch * 0.8);
    }

    @media (max-width: 889px) {
        height: calc(100ch * 0.8);
    }

    @media (max-width: 800px) {
        height: calc(100ch * 0.9);
    }
`
const Terminal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


export default function App() {
    return (<>
        <AppContainer>
            <div id='screen' className="on" style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}>
                <CRT id='crt'>
                    <div className="scanline"></div>
                    <Terminal className="terminal">
                        <BoxesInBox/>
                    </Terminal>
                </CRT>

            </div>
        </AppContainer>
    </>)
}
