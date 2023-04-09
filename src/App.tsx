import './App.css';
import { useState } from 'react';
import { ButtonGlitch, ButtonIcon, MintButton } from './Components/Styled';
import { Grills } from './Components/Animated';
import { Home, Roadmap, Team, Whitelist } from './Components/Pages';
import styled from 'styled-components';
import {useSpring, animated} from '@react-spring/web';

const Container = styled.div`
  position: relative;
  display: flex;
`

const ModalBG = styled(animated.div)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: #0000009d;
    z-index: 99;
    font-family: "VT323", monospace;
    opacity: 0;
`

const HeaderText = styled.div`
  font-family: "VT323", monospace;
  line-height: 20px;


  @media (max-width: 800px) {
    font-size: 1rem;
  }
`

const AppNav = styled.div`
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  margin: 0 0 0 8rem;
  font-size: 1.8rem;
  letter-spacing: 3px;
  font-family: 'ADrip';
`

function App() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

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
            <HeaderText className='Header-contnet-left'>
              <p>5000 COLLECTION MINT PRICE: 0.025ETH</p>
            </HeaderText>
            <div className='Header-content-right'>
              <div className="Socials">
                <ButtonIcon icon='opensea'/>
                <ButtonIcon icon='twitter'/>
                <ButtonIcon icon='discord'/>
              </div>
              <Grills />

              <ButtonGlitch className="button-glitch" style={{margin: '0 -0.35rem 0 2rem', fontFamily: 'aAnotherTag', fontSize: '2rem', letterSpacing: '3px', lineHeight: '20px'}} type="submit">Connect Wallet</ButtonGlitch>
            </div>
          </div>
          <AppNav>
            <div className='noselect'>
                <span onClick={()=>{setTab(0)}} className={tab === 0 ? 'NavBtnA' : 'NavBtn'}>HOME</span>|
                <span onClick={()=>{setTab(1)}} className={tab === 1 ? 'NavBtnA' : 'NavBtn'}>ROADMAP</span>|
                <span onClick={()=>{setTab(2)}} className={tab === 2 ? 'NavBtnA' : 'NavBtn'}>TEAM</span>|
                <span onClick={()=>{setTab(3)}} className={tab === 3 ? 'NavBtnA' : 'NavBtn'}>WHITELIST</span>
            </div>
          </AppNav>
        </div>
      </header>
      <Container>
        <div style={{width: '100%', padding: '1rem 0 0 0'}}>
          {tab === 0 ? <Home  /> : <></>}
          {tab === 1 ? <Roadmap /> : <></>}
          {tab === 2 ? <Team  /> : <></>}
          {tab === 3 ? <Whitelist  /> : <></>}
        </div>
      </Container>
    </div>
  );
}

export default App;
