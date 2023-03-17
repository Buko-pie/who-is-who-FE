import './App.css';
import { useState } from 'react';
import { ButtonGlitch, ButtonIcon, MintButton } from './Components/Styled';
import { Grills } from './Components/Animated';
import { Home, Roadmap } from './Components/Pages';
import styled from 'styled-components';
import {useSpring, animated} from '@react-spring/web';

const Container = styled.div`
  position: relative;
  display: flex;
`

const FloatingSection = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
`
const FloatingBtn = styled.button`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  transform: translate(-60%, 20vh);
  background: #e63525;
  position: absolute;
  z-index: 100;
`

function App() {
  const [open, setOpen] = useState(false)

  const [style, api] = useSpring(() => ({
    transform: 'translate(100%, 0)',
  }));

  const handleClick = () => {
    if (!open) {
      api.start({
        transform: 'translate(0%, 0)'
      })
    } else {
      api.start({
        transform: 'translate(100%, 0)'
      })
    }
    setOpen(!open);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='Header-bar'>
          <div className='Shape-circle' />
          <div className='Header-content'>
            <div className='Header-contnet-left'>
              <p><b>5000</b> COLLECTION <b>MINT PRICE:</b> 0.025ETH</p>
            </div>
            <div className='Header-content-right'>
              <div className="Socials">
                <ButtonIcon icon='twitter'/>
                <ButtonIcon icon='discord'/>
              </div>
              <Grills />

              <ButtonGlitch className="button-glitch" style={{margin: '0 -0.35rem 0 2rem'}} type="submit">Connect Wallet</ButtonGlitch>
            </div>
          </div>
        </div>
      </header>
      <Container>
        <FloatingBtn onClick={() => handleClick()}/>
        <div style={{width: '100%'}}>
          <Home  />
        </div>
        <FloatingSection style={style}>
          <Roadmap />
        </FloatingSection>
      </Container>
    </div>
  );
}

export default App;
