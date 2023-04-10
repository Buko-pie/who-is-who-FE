import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { styled } from '@stitches/react'
import { useTrail, animated, SpringValue } from '@react-spring/web'

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
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '0022.png',
    '0031.png',
    '0036.png',
    '0057.png',
    '0061.png',
    '0102.png',
    '0105.png',
    '0115.png',
    '0116.png',
    '0117.png',
    '0119.png',
    '0123.png',
    '0124.png',
    'black_ninja.png',
    'ChickenDinner.png',
    'Cyber.png',
    'cyberking.png',
    'cybersneak.png',
    'IMG_1412.jpg',
    'profikle.jfif',
    'smart.png',
    'Sneak2.png',
    'statue1.png',
    'Whiteangel.png',
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

function GetRandomNumbersFromImgs(maxNum: number){
    const numbers = Array.from({ length: maxNum }, (_, i) => i); // create an array of numbers from 1 to maxNum
    const selectedNumbers = [];

    while (selectedNumbers.length < 6 && numbers.length > 0) { // select 6 unique numbers or until all numbers have been selected
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNumber = numbers[randomIndex];
        selectedNumbers.push(randomNumber);
        numbers.splice(randomIndex, 1); // remove selected number from array
    }

    return selectedNumbers;
  }


export default function App() {
    const trailCount = useRef(0);
    const isCovered = useRef(false);
    const [randomImgNum, setRandomImgNum] = useState([0, 1, 2, 3, 4, 5]);

    const [randoDirs, setRandoDirs] = useState([
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)],
        rotations[Math.floor(Math.random() * rotations.length)]
    ]);

    const [trail, api] = useTrail(randomImgNum.length, i => ({
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
            if (trailCount.current === randomImgNum.length - 1){
                if(!isCovered.current){
                    setTimeout(() => {
                        HandleClick();
                    }, 3000);
                }else{
                    HandleClick();
                }
            }
        },
    }));

    function HandleClick(){
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

            setRandomImgNum(GetRandomNumbersFromImgs(front.length));
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

    function SetDir (dir: Directions, clipPaths: SpringValue[]) {
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

    useEffect(() => {
        HandleClick();
    }, []);

    return (
        <AppContainer>
        <Container>
            {trail.map(({ clipPathN, clipPathS, clipPathE, clipPathW, value }, i) => (
                <Box key={i}>
                    <FrontBox key={i+'f'}>
                        <ImgContainer style={{
                            backgroundImage: `url(${require('../../Assets/images/profiles/' + front[randomImgNum[i]])})`
                        }}>
                            <BoxInsetShadow />
                            <Cover style={{
                                clipPath: SetDir(randoDirs[i], [clipPathN, clipPathS, clipPathE, clipPathW]),
                            }} />
                        </ ImgContainer>
                    </FrontBox>
                </Box>
            ))}
        </Container>
        </AppContainer>
    )
}
