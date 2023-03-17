import React, { useState, useEffect } from 'react';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';
import { type, clear } from '../Functions/type';
import styled from 'styled-components';

import data from '../Data/team';


const AppContainer = styled(animated.div)`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const Container = styled(animated.div)`
    display: flex;
    position: relative;
    /* grid-template-columns: repeat(5, minmax(100px, 1fr));*/
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
    will-change: width, height;

    &:before{
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: #000000;
        background-image: url(${require('../../Assets/images/logo2-white.png')});
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: center;
        opacity: 30%;
    }
`

const BoxesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2rem;
    gap: 2rem;
    flex-flow: row wrap;
    justify-content: center;
`

const BoxItem = styled(animated.div)`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;

`

const BoxDesc = styled.div`
    display: block;
    height: 2rem;
`

const Portrait = styled(animated.div)<{ image? : string}>`
    width: 11vw;
    height: 11vw;
    position: relative;
    background: white;
    border-radius: 5px;
    will-change: transform, opacity;

    ${({image}) => image ? `
        &:after {
            content: " ";
            width: 100%;
            height: 100%;
            position: absolute;
            background-image: url(${require('../../Assets/images/' + image)});
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }
    ` : ``}
`

const Box: React.FC<{style: any, item: any, index: number, img?: string}> = ({style, item, index, img}) => {
    async function TypeTeams() {
        let n = document.querySelector('#team_N' + index);
        let d = document.querySelector('#team_D' + index);

        type(`▌${item.name}`, { initialWait: (1200 + (index * 50)) }, n);
        type(`<${item.description}>`, { initialWait: (1300 + (index * 50)) }, d);
    }
    useEffect(() => {
        TypeTeams();
    }, []);

    return(
        <BoxItem style={{...style,}}>
            <Portrait
                image={img}
                style={{backgroundImage: item.css}}
            />
            <BoxDesc>
                <div id={'team_N' + index} style={{padding: '0 0.1rem', color: 'black', backgroundColor: 'white'}}/>
                <div id={'team_D' + index}  style={{fontSize: '1rem', padding: '0 0.1rem', backgroundColor: 'black', textAlign: 'center'}}/>
            </BoxDesc>
        </BoxItem>
    );
}

export default function App() {
    const [open, set] = useState(true)

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
    })

    const introAPI = useSpringRef()
    const { transform, ...introRest } = useSpring({
        ref: introAPI,
        config: config.stiff,
        from: {
            transform: 'translate(0, -100%)',
        },
        to: {
            transform: 'translate(0, 0%);',
        },
    })

    const transApi = useSpringRef()
    const transition = useTransition(open ? data : [], {
        ref: transApi,
        trail: 400 / data.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain([introAPI, springApi, transApi], [
        0.1,
        0.5,
        1,
    ])

    return (<>
        <AppContainer style={{transform: transform}}>
            <Container
                style={{ ...rest, width: size, height: size }}
                onClick={() => set(open => !open)}>
                <BoxesContainer>
                    {transition((style, item, state, index) => (
                        <Box style={style} item={item} index={index} img='blackplasticwho.png' />
                    ))}
                </BoxesContainer>
            </Container>
        </AppContainer>
    </>)
}