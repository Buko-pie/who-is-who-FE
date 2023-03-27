import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { styled } from '@stitches/react'
import { useTrail, animated, SpringValue } from '@react-spring/web'
import { backgroundImage, backgroundRepeat, backgroundSize, zIndex } from 'styled-system'

const AppContainer = styled('div', {
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
})

const Container = styled('div', {
    width: '100%',
    height: 'max-content',
    padding: '1rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    background: '#d62020'
})

const Box = styled('div', {
    position: 'relative',
    height: 'calc(14vw * 0.8)',
    width: 'calc(14vw * 0.8)',
})

const SharedStyles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    fontWeight: 800,
    backfaceVisibility: 'hidden',
    backgroundImage: 'linear-gradient(60deg, #3700ff, #000485, 80%,#000000)',
};

const ImgContainer = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0
});

const Cover = styled(animated.div, {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
    backgroundColor: '#303030',
    position: 'absolute',
    backgroundImage: `url(${require('../../Assets/images/tag.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
});

const CoverImg = styled(animated.div, {
    width: '100%',
    height: '100%',
    clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
    position: 'absolute',
    zIndex: 2,
    backgroundImage: `url(${require('../../Assets/images/tag.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
})

const BoxInsetShadow = styled('div', {
    width: '100%',
    height: '100%',
    boxShadow: 'inset 0 0 10px #000000',
    '-moz-box-shadow': 'inset 0 0 10px #000000',
    '-webkit-box-shadow': 'inset 0 0 10px #000000',
    zIndex: 5
});

const FrontBox = styled('div', {
    ...SharedStyles,
})

const BackBox = styled(animated.div, {
    ...SharedStyles,
})

const front = [
    'blackplasticwho.png',
    'blackplasticwho.png',
    'blackplasticwho.png',
    'blackplasticwho.png',
    'blackplasticwho.png',
    'blackplasticwho.png',
]

enum Directions {
    North,
    East,
    South,
    West
}

const rotations = [
    Directions.North,
    Directions.East,
    Directions.South,
    Directions.West
]


export default function App() {
    const trailCount = useRef(0);
    const isCovered = useRef(false);
    const randomRots = useRef(['', '', '', '', '', '']);
    const [randoDirs, setRandoDirs] = useState([
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)]
    ]);


    useEffect(() => {
        handleClick();
    }, []);

    const [trail, api] = useTrail(front.length, i => ({
        clipPathN: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        clipPathS: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        clipPathE: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        clipPathW: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        value: 0,
        onStart: () => {
            trailCount.current = 0;
        },
        onRest: () => {
            trailCount.current++;
            if (trailCount.current === front.length - 1){
                if(!isCovered.current){
                    setTimeout(() => {
                        handleClick();
                    }, 3000);
                }else{
                    handleClick();
                }
            }
        },
    }));

    const handleClick = () => {
        var newRandRots = []
        for (let i = 0; i < randoDirs.length; i++) {
            newRandRots.push(rotations[Math.floor(Math.random() * rotations.length)])
        }
        setRandoDirs(newRandRots);

        if (isCovered.current) {
            api.start({
                clipPathN: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                clipPathS: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                clipPathE: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
                clipPathW: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                value: 100
            })
            isCovered.current = false
        } else {
            api.start({
                clipPathN: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                clipPathS: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                clipPathE: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                clipPathW: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                value: 0
            })
            isCovered.current = true
        }
    }

    const setDir = (dir: Directions, clipPaths: SpringValue[]) => {
        switch (dir) {
            case Directions.North:
                return clipPaths[0];
            case Directions.South:
                return clipPaths[1];
            case Directions.East:
                return clipPaths[2];
            case Directions.West:
                return clipPaths[3];

            default:
                return clipPaths[0];
        }
    }

    return (
        <AppContainer>
        <Container>
            {trail.map(({ clipPathN, clipPathS, clipPathE, clipPathW, value }, i) => (
                <Box key={i}>
                    <FrontBox key={i+'f'}>
                        <ImgContainer style={{
                            backgroundImage: `url(${require('../../Assets/images/' + front[i])})`
                        }}>
                            <BoxInsetShadow />
                            <Cover style={{
                                clipPath: setDir(randoDirs[i], [clipPathN, clipPathS, clipPathE, clipPathW]),
                            }} />
                        </ ImgContainer>
                    </FrontBox>
                </Box>
            ))}
        </Container>
        </AppContainer>
    )
}
