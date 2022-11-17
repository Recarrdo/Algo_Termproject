import '../css/modal.css';
import useStore from '../store';
import '../App.css';

export default function Registeration(){
  const { openModal, SetOpenModal } = useStore();
  const { firstW, SetFirstWeight } = useStore();
  const { secondW, SetSecondWeight } = useStore();
  const { x, SetX } = useStore();
  const { y, SetY } = useStore();
  const { dataArr, setDataArr } = useStore();
  const { SetInit } = useStore();

  // const [ firstW, setFirstW ] = useState();
  // const [ secondW, setSecondW ]= useState();

  // function firstHandler (e) {
  //   setFirstW(e.target.value);
  // };   ////계산된 속성명 사용

  // function secondHandler (e) {
  //   setSecondW(e.target.value);
  // };   ////계산된 속성명 사용

  function loginClickHandler () {
    setDataArr(dataArr, x, y, firstW, secondW)
    SetOpenModal();
  }; 

  return(
    <div className="Registeration">
      <div className="open_registeration">
        <header>
          <span style={{fontWeight: '800'}}>입력</span>
          <span style={{textAlign: 'right'}} onClick={SetOpenModal}>❌</span>
        </header>
        <section>
          <div className='login_div'>
            <div className='login_input_div'>
              <p> 첫번째 가중치 </p>
              <input type='text' name='first' placeHolder = '첫 값' value={firstW} onChange={(e) => {SetFirstWeight(e)}}/>
            </div>

            <div className='login_input_div' style={{ 'marginTop' : '5px'}}>
              <p> 두번째 가중치 </p>
              <input type='text' name='second' placeHolder = '둘째 값' value={secondW} onChange={(e) => {SetSecondWeight(e)}}/>
            </div>
          </div>
        </section>
        <footer>
          <span onClick={()=>{ 
            SetOpenModal();
            setDataArr(dataArr, x, y, firstW, secondW);
            SetInit();
            console.log("dataArr : ", dataArr);
          }}>추가</span>
        </footer>
      </div>
    </div>
  );
}