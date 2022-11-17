
import './App.css';
import seoul from './seoul.png';
import 강원도 from './강원도.png';
import 경상북도 from './경상북도.png';
import 경상남도 from './경상남도.png';
import 충청남도 from './충청남도.png';
import 충청북도 from './충청북도.png';
import 전라남도 from './전라남도.png';
import 전라북도 from './전라북도.png';
import 제주도 from './제주도.png';
import logo from './logo.svg';
import chungnam from './assets/chungnam.png'
import ReactDom from "react-dom";
import React, { useState, useRef, useEffect, isStart } from 'react';
import Registeration from './pages/modal';
import useStore from './store';

function Select_button(){
  return(
    <div></div>
  );
}

function PointData(x, y, firstW, secondW){
  
  const send = {
    x: "",
    y: "",
    firstW: "",
    secondW: "",
  }

  const arr = [];

  send.x = x;
  send.y = y;
  send.firstW = firstW;
  send.secondW = secondW;
    
  arr.push(send);

  return arr;
}

const Brush = ({width, height, imgSrc}) => {
  const { openModal, SetOpenModal } = useStore();
  const { firstW, SetFirstWeight } = useStore();
  const { secondW, SetSecondWeight } = useStore();
  const { x, SetX } = useStore();
  const { y, SetY } = useStore();
  const { dataArr, pushArr } = useStore();

  const pointArr = [];

  const send = {
    x: "",
    y: "",
    firstW: "",
    secondW: "",
  }
  const canvas = useRef(null);
  
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (!canvas) return;
    setCtx(canvas.current.getContext('2d'));

    const image = new Image(width, height);
    // https://w.namu.la/s/126588db9d20e18ebae80ad547e784ffc25c2e2a62d41e2e0d6bc0ec45bf77c4e0dc3f757cd2ea5e1690ace9288f424edb6f0c5bfd5da345f4b4c254e6d12960f9f75cf5ba5e334e66829eed9f2ce63901c5a836d784111b168b62452c5dcd79a2c99fcf61bacd7d6b5de508b379815c
    image.src = imgSrc;
   
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height);
    };


  }, [canvas.current]);

  const handleMouseClickRect = e => {
    if (ctx) {
      var rect = canvas.current.getBoundingClientRect();
      ctx.fillStyle = 'red';
      ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 10, 10);
      pointArr.push(PointData(e.clientX - rect.left, e.clientY - rect.top, 10, 10));
      console.log(pointArr);
    }
  };
  const handleMouseClickArc = e => {
    if (ctx) {
      var rect = canvas.current.getBoundingClientRect();
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      SetX((e.clientX - rect.left));
      SetY((e.clientY - rect.top));
    }
  };
  const handleMouseMove = e => {
    if (ctx) {
      var rect = canvas.current.getBoundingClientRect();
      
      ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 10, 10);
      console.log(e.clientX - rect.left, e.clientY - rect.top)
    }
  };

  // const handleReset = () => {
  //   if (ctx && isStart) {
  //     ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  //   }
  // }

    return <div width = {width} height = {height} onClick={SetOpenModal}><canvas ref={canvas} width = {width} height = {height} onClick={handleMouseClickArc} /></div>
  };

function App() {
  {
    /* main 화면 보기 *//*추가 요소가 생기면 여기에도 추가시켜야함*/
    const { openModal, SetOpenModal } = useStore();


    const showMain = function () {
      const content1 = document.getElementById('reference');
      const content2 = document.getElementById('intro');
      const contentMap = document.getElementById('maincontents');
      content1.style.display = 'none';
      content2.style.display = 'block';
      contentMap.style.display='none';

      const contentimage = document.getElementsByClassName('image');
      contentimage[0].style.display = 'inline-block';
      contentimage[1].style.display = 'inline-block';
      contentimage[2].style.display = 'inline-block';
      contentimage[3].style.display = 'inline-block';
      contentimage[4].style.display = 'inline-block';
      contentimage[5].style.display = 'inline-block';
      contentimage[6].style.display = 'inline-block';
      contentimage[7].style.display = 'inline-block';
      contentimage[8].style.display = 'inline-block';

      const contentSidebar1 = document.getElementById('logo');
      contentSidebar1.style.marginBottom = '20vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '50px';
      contentSidebar2[1].style.paddingBottom = '50px';
    }




    const showMap0 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[0].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';


      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap1 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[1].style.display='block';
      contentMap[0].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap2 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[2].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap3 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[3].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap4 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[4].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap5 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[5].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap6 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[6].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap7 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[7].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[0].style.display = 'none';
      contentMap[8].style.display = 'none';

      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showMap8 = function () {
      const content1 = document.getElementsByClassName('image');
      content1[0].style.display = 'none';
      content1[1].style.display = 'none';
      content1[2].style.display = 'none';
      content1[3].style.display = 'none';
      content1[4].style.display = 'none';
      content1[5].style.display = 'none';
      content1[6].style.display = 'none';
      content1[7].style.display = 'none';
      content1[8].style.display = 'none';
      

      const content2 = document.getElementById('maincontents');
      content2.style.display='block';

      const contentMap=document.getElementsByClassName('Map');
      contentMap[8].style.display='block';
      contentMap[1].style.display = 'none';
      contentMap[2].style.display = 'none';
      contentMap[3].style.display = 'none';
      contentMap[4].style.display = 'none';
      contentMap[5].style.display = 'none';
      contentMap[6].style.display = 'none';
      contentMap[7].style.display = 'none';
      contentMap[0].style.display = 'none';


      const contentSidebar1 = document.getElementById('logo'); /*지도 누르면 사이드바 메뉴 줄어들기*/
      contentSidebar1.style.marginBottom = '5vh';

      const contentSidebar2 = document.getElementsByClassName('button');
      contentSidebar2[0].style.paddingBottom = '10px';
      contentSidebar2[1].style.paddingBottom = '10px';
    }

    const showSetting = function () {
    document.getElementById('logo').style.marginBottom = 3;
  }

    

    /* reference 보기 */
    const showReference = function () {
      const content1 = document.getElementById('reference');
  
   
      if(content1.style.display !== 'none') {
        content1.style.display = 'none';
      }
     
      else {
        content1.style.display = 'block';
      }
    }






    return (

      
      <body>
        
        <div id="sidebar">
          
          <div id="logo">
          {/* <div id="jb"></div> */}
            <a
              href="./index.html"
              rel="noopener noreferrer">
              SUBWAY STATION PLACEMENT ALGORITHM
            </a>
          </div>
          
          <div class="button" onClick={showMain} >
            <a>MAIN</a>
          </div>
          
          <div class="button" onClick={showReference}>
            <a>REFERENCE</a> {/*reference 버튼*/}
          </div>
          <div id="maininput"></div>
        </div>



        <div id="main">
        <div id="intro">

           <div id="line">
        <div class="image" onClick={showMap0}><img src={seoul}/></div>
            
            <div class="image" onClick={showMap1}><img src={강원도}/></div>
            <div class="image" onClick={showMap2}><img src={경상북도}/></div>
            </div>
            <div id="line">
            <div class="image" onClick={showMap3}><img src={경상남도}/></div>
            <div class="image" onClick={showMap4}><img src={충청남도}/></div>
            <div class="image" onClick={showMap5}><img src={충청북도}/></div>
            </div>
            <div id="line">
            <div class="image" onClick={showMap6}><img src={전라남도}/></div>
            <div class="image" onClick={showMap7}><img src={전라북도}/></div>
            <div class="image" onClick={showMap8}><img src={제주도}/></div>
            </div>
        </div>


        {openModal && <Registeration />}
        <div id="maincontents">{/*받을파일*/}
          <div class="Map" id="Seoul">
            <div>
            <Brush width={700} height={700} imgSrc={seoul}/>
            </div>

          </div>

          <div class="Map" id="Gwangwon">
            <div>
            {/* {openModal && <Registeration />} */}
            <Brush width={700} height={700} imgSrc={강원도}/>
            </div>
          </div>

          <div class="Map" id="Kyeongbuk">
            <div>
            {/* {openModal && <Registeration />} */}
            <Brush width={700} height={700} imgSrc={경상북도}/>
            </div>
          </div>

          <div class="Map" id="Kyeongnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={경상남도}/>
            </div>
          </div>

          <div class="Map" id="Chungnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={충청남도}/>
            </div>
          </div>

          <div class="Map" id="Chungbuk">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={충청북도}/>
            </div>
          </div>

          <div class="Map" d="Jeonnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={전라남도}/>
            </div>
          </div>

          <div class="Map" id="Jeonbuk">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={전라북도}/>
            </div>            
          </div>

          <div class="Map" id="Jeju">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={700} imgSrc={제주도}/>
            </div>            
          </div>
          </div>

        
        <div id="reference">
        <div id="button" onClick={showReference}>
        <div id="menu_esc"><div id="escbutton"></div>MENUESC</div>
             참조내용
             </div>
          </div>
        </div>


      </body>
    );
  }
}

export default App;

{/* <div id="box">
        <div id="left">
          <h1 id="fh5co-logo">
        <a
          href="./index.html"
          rel="noopener noreferrer"
        >
          SUBWAY STATION PLACEMENT ALGORITHM
          </a>
        </h1>
        <div id="sidebar_button">
          <a href="http://www.naver.com" target="temp">
          MAIN
          </a>
        </div>
        <div id="sidebar_button">
          <a>
          REFERENCE
          </a>
        </div>
        <div id="sidebar_button">
          <a>
          ETC
          </a>
        </div>
        <a>
          <iframe name="입력창" height="500px">
            </iframe>
        </a>
        </div>
    
        <div id="maincontents">
        <MainContents/>
         
        </div>
      </div>
     */}