import { useEffect, useState } from 'react';
import { type, clear, pause } from '../Functions/type';
import styled from 'styled-components';
import { BoxesInBox } from '../Animated';

interface TypeProps{
    wait?: number,
    initialWait?: number,
    finalWait?: number,
    lineWait?: number,
    typerClass?: string,
    useContainer?: boolean,
    stopBlinking?: boolean,
    processChars?: boolean,
    clearContainer?: boolean,
}

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

const AppNav = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
`

const CRT = styled.div`
    min-width: 80ch; /* This makes 80 monospace characters fit on the screen */
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
`

export default function App() {
    const [tab, setTab] = useState(0);

    function ClearContent() {
        const elContent = document.querySelector('#terminalContent');
        clear(elContent);
    }

    async function FillRM() {
        await pause(0.1);
        const elContent = document.querySelector('#terminalContent');
        ClearContent();
        await type('ROADMAP-STAGE 1', {  wait: 0, styles: 'font-size: 2.5rem;'}, elContent);

        await type([
                '   ART IDEATION.............................[✓]',
                '   CRAFTING THE ART.........................[✓]',
                '   WEBSITE UI/UX DRAFT......................[✓]',
                '   WEBSITE DEVELOPMENT......................[✓]',
                '   WEBSITE LAUNCH...........................[ ]',
                '   MINT [TBA]...............................[ ]',
                '   REVEAL...................................[ ]',
                '   RARE HOLDERS REWARD DROPS [PHYSICAL].....[ ]',
                '   3D COMPETITION WITH ETH PRIZES...........[ ]',
                '   PHYSICAL COPY [CREATION STAGE]...........[ ]',
                '\n',
                '\n',
                '\n',
            ],
            {
                wait: 0,
                styles: 'font-size: 1.5rem;'
            },
            elContent
        );
    }

    useEffect(() => {
        FillRM();
    }, []);

    return (<>
        <AppContainer>
            <div id='screen' className="on" style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}>
                <CRT id='crt'>
                    <div className="scanline"></div>
                    <div className="terminal">
                        <AppNav>
                            <div>
                                <span onClick={()=>{setTab(0); FillRM();}} className={tab === 0 ? 'NavBtnA' : 'NavBtn'}>ROADMAP</span>|<span onClick={()=>{setTab(1); ClearContent();}} className={tab === 1 ? 'NavBtnA' : 'NavBtn'}>TEAM</span>
                            </div>
                        </AppNav>
                        {tab === 1 ? <BoxesInBox/> : <div id='terminalContent' />}
                    </div>
                </CRT>

            </div>
        </AppContainer>
    </>)
}
