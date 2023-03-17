import { useRef, useEffect, useLayoutEffect } from 'react'
import { styled } from '@stitches/react'
import { useTrail, animated } from '@react-spring/web'
import { debug } from 'console'

const AppContainer = styled('div', {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
})

const Container = styled('div', {
    display: 'flex',
    gap: 10,
    marginBottom: 80,
})

const Box = styled('div', {
    position: 'relative',
    height: '15rem',
    width: '15rem',
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
}

const ImgContainer = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
})

const FrontBox = styled(animated.div, {
    ...SharedStyles,
    backgroundImage: 'linear-gradient(270deg, #db0909, #e53524, 80%,#f83486)',
    border: 'solid 2px #31cd66',
})

const BackBox = styled(animated.div, {
    ...SharedStyles,
    backgroundImage: 'linear-gradient(270deg, #db0909, #e53524, 80%,#f83486)',
    border: 'solid 2px #31cd66',
    color: '#fafafa',
})

const front = [
    'blackplasticwho.png',
    'tag.png',
    'blackplasticwho.png',
    'tag.png',
    'blackplasticwho.png',
    'tag.png',
]

const back = [
    'tag.png',
    'blackplasticwho.png',
    'tag.png',
    'blackplasticwho.png',
    'tag.png',
    'blackplasticwho.png',
]

export default function App() {
    const trailCount = useRef(0);
    const isFlipped = useRef(false);

    const [trail, api] = useTrail(front.length, () => ({
        rotateY: 0,
        onStart: () => {
            trailCount.current = 0;
        },
        onRest: () => {
            trailCount.current++;
            if (trailCount.current === front.length)
                handleClick();
        },
    }))

    useEffect(() => {
        console.log("useEffect");
        handleClick();
      }, [isFlipped]);

    const handleClick = () => {
        if (isFlipped.current) {
            api.start({
                rotateY: 0,
            })
            isFlipped.current = false
            } else {
            api.start({
                rotateY: 180,
            })
            isFlipped.current = true
        }
    }

    return (
        <AppContainer>
        <Container onClick={handleClick}>
            {trail.map(({ rotateY }, i) => (
                <Box key={i}>
                    <FrontBox
                        key={i+'f'}
                        style={{
                            transform: rotateY.to(val => `perspective(600px) rotateY(${val}deg)`),
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <ImgContainer style={{
                            backgroundImage: `url(${require('../../Assets/images/' + front[i])})`
                        }}/>
                    </FrontBox>
                    <BackBox
                        key={i+'b'}
                        style={{
                            transform: rotateY.to(val => `perspective(600px) rotateY(${180 - val}deg)`),
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <ImgContainer style={{
                            backgroundImage: `url(${require('../../Assets/images/' + back[i])})`
                        }}/>
                    </BackBox>
                </Box>
            ))}
        </Container>
        </AppContainer>
    )
}
