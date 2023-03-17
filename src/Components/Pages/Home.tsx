import { SlideCovers } from '../Animated';
import { MintButton } from '../Styled';



export default function App() {
    return (<>
        <div className='Banner'>
            <div className='ImgContainer' style={{justifyContent: 'right'}}>
            <img className='Banner-logo' src={require('../../Assets/images/main-logo.png')} alt="" />
            </div>
            <div className='ImgContainer' style={{justifyContent: 'left'}}>
            <img className='Banner-model' src={require('../../Assets/images/blackplasticwho.png')} alt="" />
            </div>
        </div>
        <div className='PrevCollections'>
            <SlideCovers />
        </div>
         <MintButton />
    </>)
}
