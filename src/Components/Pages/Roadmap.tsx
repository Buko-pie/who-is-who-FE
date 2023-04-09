import { useEffect, useState } from 'react';
import { type, clear, pause } from '../Functions/type';
import styled from 'styled-components';

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
const Terminal = styled.div`
    display: flex;
    justify-content: center;
`

const TerminalContainer = styled.div`
    width: 100%;
    display: content;
    align-items: center;
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
        await type(
            'ROADMAP-STAGE 1',
            {
                wait: 5,
                initialWait: 0,
                styles: 'font-size: 2.5rem; display: flex;',
                processChars: true,
            },
            elContent
        );

        await type([
                '\tART IDEATION.............................[✓]',
                '\tCRAFTING THE ART.........................[✓]',
                '\tWEBSITE UI/UX DRAFT......................[✓]',
                '\tWEBSITE DEVELOPMENT......................[✓]',
                '\tWEBSITE LAUNCH...........................[ ]',
                '\tMINT [TBA]...............................[ ]',
                '\tREVEAL...................................[ ]',
                '\tRARE HOLDERS REWARD DROPS [PHYSICAL].....[ ]',
                '\t3D COMPETITION WITH ETH PRIZES...........[ ]',
                '\tPHYSICAL COPY [CREATION STAGE]...........[ ]',
            ],
            {
                wait: 5,
                initialWait: 0,
                finalWait: 0,
                lineWait: 0,
                styles: 'font-size: 1.5rem;',
                processChars: true,
            },
            elContent
        );

        await type([
                '\n',
            ],
            {
                lineWait: 999999,
                styles: 'font-size: 1.5rem;',
            },
            elContent
        )
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
                    <Terminal className="terminal">
                        <TerminalContainer id='terminalContent' />
                    </Terminal>
                </CRT>

            </div>
        </AppContainer>
    </>)
}
