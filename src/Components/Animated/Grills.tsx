import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTrail, animated, useSprings, useSpringRef } from '@react-spring/web'



const Grills = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(12, 0.8rem);
    justify-content: right;
    align-items: center;
    margin: 0 1rem 0 0;
`

const Parallelogram = styled(animated.div)`
    height: 3rem;
    width: 2rem;
    background-color: #000000;
    clip-path: polygon(80% 0, 100% 0, 20% 100%, 0% 100%);
    flex: 0 0 40px;
`

const GRILLS= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function App() {
    const isThicc = useRef(false);

    const [springs, api] = useTrail(GRILLS.length, i => ({
        clipPath: 'polygon(80% 0, 100% 0, 20% 100%, 0% 100%)',
        config: { duration: 100 }
    }));

    const handleClick = () => {
        if (isThicc.current) {
            api.start({
                clipPath: 'polygon(70% 0, 100% 0, 30% 100%, 0% 100%)',
            })
            isThicc.current = false
            } else {
            api.start({
                clipPath: 'polygon(80% 0, 100% 0, 20% 100%, 0% 100%)',
            })
            isThicc.current = true
        }
    }

    useEffect(() => {
        const t = setInterval(
          () => handleClick(),
          1000
        );
        return () => clearTimeout(t);
      }, []);

    return (
        <>
            <Grills>
                {springs.map((styles, i) => {
                    return(
                        <Parallelogram key={i} style={styles} />
                    )
                })}
            </Grills>
        </>
    )
}
