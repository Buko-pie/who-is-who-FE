import styled from 'styled-components'


const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
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

const Terminal = styled.div`
    display: flex;
    justify-content: center;
`

const Modal = styled.div`
    width: 50%;
    height: 50%;
    padding: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: #d62020;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    clip-path: polygon(5% 0%, 100% 0, 100% 90%, 95% 100%, 0 100%, 0 10%);
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding: 1rem;
    clip-path: polygon(5% 0%, 100% 0, 100% 90%, 95% 100%, 0 100%, 0 10%);
    background-color: black;
`

const Input = styled.input`
    width: 100%;
    color: #ffffff;
    padding: 0 1rem;
    margin: 5rem 0 0 0;
    border: 0;
    outline: none !important;
    text-align: center;
    background-color: #595959;

    &:focus{
        border: 0;
        outline: none !important;
    }
`

const MintBtn = styled.button`
    width: 13rem;
    height: 1.9rem;
    margin: 1rem 0 0 0;
    clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
    background: radial-gradient(#2cb5ff 30%, #1b57e2);

    &:hover{
        background: radial-gradient(#47bdfd 30%, #1b57e2);
    }
`


export default function App() {


    return (
        <AppContainer className='Whitelist'>
            <CRT id='crt'>
                <div className="scanline"></div>
                <Terminal className="terminal">
                    <Modal>
                        <h1 style={{fontSize: '2rem'}}>WHITELIST CHECKER</h1>
                        <Content>
                            <Input />
                            <MintBtn>check</MintBtn>
                        </Content>
                    </Modal>
                </Terminal>
            </CRT>
        </AppContainer>
    )
}
