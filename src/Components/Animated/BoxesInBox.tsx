import React, { useState, useEffect } from 'react';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';
import { type, clear, pause } from '../Functions/type';
import styled from 'styled-components';

import data from '../Data/team';

interface TypeProps{
    wait?: number,
    initialWait?: number,
    finalWait?: number,
    lineWait?: number,
    typerClass?: string,
	styles?: string,
    useContainer?: boolean,
    stopBlinking?: boolean,
    processChars?: boolean,
    clearContainer?: boolean,
}

const AppContainer = styled(animated.div)`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled(animated.div)`
    display: flex;
    position: relative;
    /* grid-template-columns: repeat(5, minmax(100px, 1fr));*/
    border-radius: 5px;

    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
    will-change: width, height;
    background: #00000034;
    overflow-x: auto;
    z-index: 0;

    &:before{
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url(${require('../../Assets/images/logo2-white.png')});
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: center;
        opacity: 30%;
    }
`

const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 75% 25%;
    z-index: 1;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-template-rows: 70% 30%;
    }
`

const DescBox = styled.div`
    display: content;
    font-size: 1.1rem;
    margin: 1rem;
    padding: 1rem;
    background-color: black;
    border-width: 2px;
    overflow-y: auto;
`

const BoxesContainer = styled.div`
    display: flex;
    height: 100%;
    position: relative;
    padding: 2rem;
    column-gap: 2rem;
    row-gap: 5rem;
    flex-flow: row wrap;
    justify-content: center;
    align-items: start;
    overflow-y: auto;
`

const BoxItem = styled(animated.div)`
    display: flex;
    height: min-content;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
`

const BoxDesc = styled.div`
    display: block;
    height: 2rem;
`

const Portrait = styled(animated.div)<{ image? : string}>`
    width: 13rem;
    height: 12rem;
    position: relative;
    background: white;
    border-radius: 5px 5px 0 0;
    will-change: transform, opacity;

    ${({image}) => image ? `
        &:after {
            content: " ";
            width: 100%;
            height: 100%;
            position: absolute;
            background-image: url(${require('../../Assets/images/profiles/' + image)});
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }
    ` : ``}
`

const TeamD = styled.div`
    font-size: 1.1rem;
    padding: 1rem 0;
    background-color: black;
    text-align: center;
    border-width: 2px;
`

const Tml = {
    abort: false,
    stop(){ this.abort = true },
    async doType(text: string | string [], options: TypeProps, container: any){
        if(this.abort) this.abort = false;
        await type(text, options, container, this)
    }
}

const TmlS = {
    abort: false,
    stop(){ this.abort = true },
    doType(text: string | string [], options: TypeProps, container: any){
        if(this.abort) this.abort = false;
        type(text, options, container, this)
    }
}

const Box: React.FC<{style: any, item: any, index: number, img?: string}> = ({style, item, index, img}) => {

    async function TypeTeams() {
        let n = document.querySelector('#team_N' + index);
        let d = document.querySelector('#team_D' + index);
        clear(n);
        clear(d);

        type(`▌${item.name}`, { initialWait: (1200 + (index * 50)), processChars: true }, n);
        type(`<${item.role}>`, { initialWait: (1300 + (index * 50)), processChars: true }, d);
    }

    useEffect(() => {
        TypeTeams();
    }, []);

    return(
        <BoxItem
            style={{...style}}
        >
            <Portrait
                image={item.pic}
                style={{backgroundImage: item.css}}
            />
            <BoxDesc>
                <div id={'team_N' + index} style={{fontSize: '1.4rem', padding: '0 0.1rem', color: 'black', backgroundColor: 'white'}}/>
                <TeamD id={'team_D' + index} />
            </BoxDesc>
        </BoxItem>
    );
}

export default function App() {
    const [open, set] = useState(true);
    const [activeProfile, setActiveProfile] = useState(-1);

    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: {
            size: '20%',
        },
        to: {
            size: open ? '100%' : '20%',
        },
    });

    const introAPI = useSpringRef()
    const { transform, ...introRest } = useSpring({
        ref: introAPI,
        config: config.stiff,
        from: {
            transform: 'translate(0, -100%)',
        },
        to: {
            transform: 'translate(0, 0%)',
        },
    });

    const transApi = useSpringRef()
    const transition = useTransition(open ? data : [], {
        ref: transApi,
        trail: 400 / data.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain([introAPI, springApi, transApi], [
        0.1,
        0.5,
        1,
    ]);

    function ClearContent(index: number, item: any) {
        if (activeProfile !== index)
        {;

            if(activeProfile <= -1){
                const elContent = document.querySelector('#terminalContent');
                clear(elContent);
                TypeTerminal(item, index);
            }
        }
    };

    async function TypeTerminal(item: any, index: number) {
        if(activeProfile !== index){
            const elContent = document.querySelector('#terminalContent');
            clear(elContent);

            let descString = item.desc;

            if(item.socials){
                descString += "\n\nSOCIALS:"
                for (const social of item.socials){
                    descString += `\n<a href="${social.link}" target="_blank" style="color: ${social.color};">[[${social.name}]]</a>`;
                }
            }

            Tml.doType.bind(await Tml.doType(
                descString,
                {
                    wait: 0,
                    initialWait: 0,
                    finalWait: 50,
                    lineWait: 0,
                    styles: 'white-space: pre-line;',
                },
                elContent
            ));

        }
    };

    function onMouseClick(index: number, item: any){
        if (activeProfile > -1){
            TypeTerminal(item, index);
        }
        setActiveProfile(index);
    }

    function onMouseEnter(index: number, item: any){
        if(activeProfile <= -1){
            TypeTerminal(item, index);
        }
    }

    return (<>
        <AppContainer style={{transform: transform}}>
            <Container style={{ ...rest, width: size, height: size }}>
                <Content>
                    <BoxesContainer>
                        {transition((style, item, state, index) => (
                            <div
                                className={activeProfile === index ? 'BoxItemA' : 'BoxItem'}
                                onClick={() => onMouseClick(index, item)}
                                onMouseEnter={() => onMouseEnter(index, item)}
                                onMouseLeave={() => ClearContent(index, item)}
                            >
                                <Box
                                    style={style}
                                    item={item}
                                    index={index}
                                    img='blackplasticwho.png'
                                />
                            </div>
                        ))}
                    </BoxesContainer>
                    <DescBox id='terminalContent' />
                </Content>
            </Container>
        </AppContainer>
    </>)
}