import preLoader from '../../../assets/images/Spin.svg';

let Preloader = (props) => {
    return (
        <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
            <img src={preLoader} alt="Loader"/>
        </div>
    );
}

export default Preloader;