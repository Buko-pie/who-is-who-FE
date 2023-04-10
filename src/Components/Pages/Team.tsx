import styled from 'styled-components';
import { BoxesInBox } from '../Animated';
import { CRT, Terminal } from '../Styled'

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`


export default function App() {
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
                        <BoxesInBox/>
                    </Terminal>
                </CRT>

            </div>
        </AppContainer>
    </>)
}
