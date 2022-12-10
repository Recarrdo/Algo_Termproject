
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
  const { clearDataArr } = useStore();

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

  

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  // 1. get canvas element 
  //var canvas = document.getElementById('myCanvas');
  // 2. get 2d mode's draw element
  //var ctx = canvas.getContext("2d");
  //ctx.globalAlpha = 0.18;
  // 3. setting start draw path 
  var arrX = [];
  var arrY = [];
  var arrW = [];
  var radius = [];
  var count = 0;
  var newX=[];
  var newY=[];
  var last_count=0;

  const drawing = () => {
    if (count == 0) {
      for (let i = 0; i < dataArr.length; i++) {
        arrX.push(dataArr[i].x);
        arrY.push(dataArr[i].y);
        arrW.push(parseInt(dataArr[i].firstW) + parseInt(dataArr[i].secondW));

        if (arrW[i] > 20 && arrW[i] < 100) {
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          //여기 예시는 가중치의 값이 1~100으로 상정하였다. 
          var weight = 100 - arrW[i];
          radius[i] = weight;
          ctx.arc(arrX[i], arrY[i], weight, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.strokeStyle = 'red';
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.closePath();
          ctx.globalAlpha = 1;
        } else if (arrW[i] >= 100) {
          ctx.beginPath();
          radius[i] = 10;
          ctx.arc(arrX[i], arrY[i], 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = 'black';
          ctx.fill();
          ctx.closePath();
          newX[last_count]=arrX[i];
          newY[last_count]=arrY[i];
          last_count++;
        }
      }
    }
    count++;
  }
  var c_count = 1;
  

  const checking = () => {
    //time complexity : n!
    if (c_count == 1) {
      for (let i = 0; i < arrW.length; i++) {
        for (let j = i + 1; j < arrW.length; j++) {
          if ((arrW[i] >= 100)) {
            //Already BaseLine achieved
            var EX;
            var EY;
            if ((arrW[i] >= 100)) {
              EX = arrX[i];
              EY = arrY[i];
              i++;
              j = i;
            }
            ctx.beginPath();
            ctx.arc(EX, EY, 6, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.closePath();
            
          } else if ((arrW[i] < 100 && arrW[i] > 20) && (arrW[j] < 100 && arrW[j] > 20)) {
            var dist = getDistance(i, j);
            var total = radius[i] + radius[j];
            if (total > dist) {


              //If a small circle in a large circle belongs perfectly, there is no overlap
              //If the sum of the two radii is less than the length of the center of the two circles, 
              //  you can determine that the two circles overlap each other.
              //If the circles overlap:
              //  Divide by the ratio of a straight line to the center of each circle.
              var cal;
              if (radius[i] >= radius[j]) {
                cal = radius[i] / radius[j];
              } else {
                cal = radius[j] / radius[i];
              }

              var disX = Math.abs(arrX[j] + arrX[i]) / 2;
              var disY = Math.abs(arrY[j] + arrY[i]) / 2;
              var X, Y;

              console.log(disX, disY, i, j);
              if (radius[i] < radius[j]) {
                console.log(11, cal, disX, disY, i, j, dist);


                X = arrX[i] + ((disX - arrX[i]) / cal);
                Y = arrY[i] + ((disY - arrY[i]) / cal);



              } else if (radius[i] > radius[j]) {
                console.log(22, cal, disX, disY, i, j);

                X = arrX[j] + ((disX - arrX[j]) / cal);
                Y = arrY[j] + ((disY - arrY[j]) / cal);



              } else {
                X = disX;
                Y = disY;
              }
              newX[last_count]=X;
              newY[last_count]=Y;  
              last_count++;

              console.log(X, Y, i, j);
              ctx.beginPath();
              ctx.arc(X, Y, 6, 0, 2 * Math.PI);
              ctx.stroke();
              ctx.strokeStyle = 'green';
              ctx.fillStyle = 'green';
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }
    }
    c_count++;
  }
  const getDistance  = (dot1, dot2) => {
    var dis_x = arrX[dot1] - arrX[dot2];
    var dis_y = arrY[dot1] - arrY[dot2];

    var dist = Math.sqrt(Math.abs(dis_x * dis_x) + Math.abs(dis_y * dis_y));
    return dist;
  }
  const get_new_Distance  = (dot1, dot2) => {
    var dis_x = newX[dot1] - newX[dot2];
    var dis_y = newY[dot1] - newY[dot2];

    var dist = Math.sqrt(Math.abs(dis_x * dis_x) + Math.abs(dis_y * dis_y));
    return dist;
  }
  const last_stage  = () => {
    for(var i=0; i<last_count; i++){
      var max=0;
      var max_location;
      for(var j=0; j<last_count; j++){
          if(newY[j]>max){
            max=newY[j];
            max_location=j;
          }
          var temp=newX[i];
      newX[i]=newX[max_location];
      newX[max_location]=temp;

      var temp1=newY[i];
      newY[i]=newY[max_location];
      newY[max_location]=temp1;
      }
    }


    for(var i=0; i<last_count; i++){
      console.log(last_count, i, newX[i], newY[i]);
    }

    for(var i=0; i<last_count-1; i++){
      var min=99999;
      var min_location;
      for(var j=i+1; j<last_count; j++){
        var distance=get_new_Distance(i, j);
        if(distance<min){
          min=distance;
          min_location=j;
        }
      }
      var temp=newX[i+1];
      newX[i+1]=newX[min_location];
      newX[min_location]=temp;

      var temp1=newY[i+1];
      newY[i+1]=newY[min_location];
      newY[min_location]=temp1;

      console.log(i, newX[i], newY[i]);
    }

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    for(var i=1; i<last_count; i++){
      ctx.moveTo(newX[i-1], newY[i-1])
      ctx.lineTo(newX[i], newY[i]);
      ctx.stroke();
    }

  }


  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////


  const clearCanvas = () => {
    ctx.clearRect(0, 0, width, height);
  }

  return <div width={width} height={height + 60}>
    <div width={width} height={height} onClick={SetOpenModal}><canvas ref={canvas} width={width} height={height} onClick={handleMouseClickArc} /></div>
    <div class='button_send' width={width} height={60}onClick={() => {
      drawing();  
      checking();
      last_stage();
      clearDataArr();
    }}> 보내기 </div>
  </div>
};

function App() {
  {
    /* main 화면 보기 *//*추가 요소가 생기면 여기에도 추가시켜야함*/
    const { openModal, SetOpenModal, dataArr } = useStore();

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
      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='hidden';
      arraylist.style.height='0vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
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

      const arraylist = document.getElementById('arraylist');
      arraylist.style.visibility='visible';
      arraylist.style.height='85vh';
    }

    const showSetting = function () {
    document.getElementById('logo').style.marginBottom = 3;
  }

    

    /* reference 보기 */
    const showReference = function () {
      const content1 = document.getElementById('reference');
  
   
      if(content1.style.display !== 'block') {
        content1.style.display='block';
      }
     
      else {
        content1.style.display='none';
      }
    }


    const showList = () => {
      
    }



    return (

      
      <body>
        
        <div id="sidebar">
          
          <div id="logo">
          {/* <div id="jb"></div> */}
            <a
              href="./index.html"
              rel="noopener noreferrer">
              Fair Subway Station
            </a>
          </div>
          
          <div class="button" onClick={showMain} >
            <a>MAIN</a>
          </div>
          
          <div class="button" onClick={showReference}>
            <a>REFERENCE</a> {/*reference 버튼*/}
          </div>
          <div id="arraylist">
            {
              dataArr.map((val)=>{
                console.log(val)
                return(
                <div className='show'>
                  <span>X: {parseInt(val.x)}</span>
                  <span>Y: {parseInt(val.y)}</span>
                  <span>first-W: {val.firstW}</span>
                  <span>second-W: {val.secondW}</span>
                </div>);
              })
            }
          </div>
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
            <Brush width={700} height={600} imgSrc={seoul}/>
            </div>

          </div>

          <div class="Map" id="Gwangwon">
            <div>
            {/* {openModal && <Registeration />} */}
            <Brush width={700} height={600} imgSrc={강원도}/>
            </div>
          </div>

          <div class="Map" id="Kyeongbuk">
            <div>
            {/* {openModal && <Registeration />} */}
            <Brush width={700} height={600} imgSrc={경상북도}/>
            </div>
          </div>

          <div class="Map" id="Kyeongnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={경상남도}/>
            </div>
          </div>

          <div class="Map" id="Chungnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={충청남도}/>
            </div>
          </div>

          <div class="Map" id="Chungbuk">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={충청북도}/>
            </div>
          </div>

          <div class="Map" d="Jeonnam">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={전라남도}/>
            </div>
          </div>

          <div class="Map" id="Jeonbuk">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={전라북도}/>
            </div>            
          </div>

          <div class="Map" id="Jeju">
            {/* {openModal && <Registeration />} */}
            <div>
            <Brush width={700} height={600} imgSrc={제주도}/>
            </div>            
          </div>
          </div>

        
        <div id="reference">
        <div class="button" onClick={showReference}>
        <div id="menu_esc"><div id="escbutton">❌</div></div>
             </div>
             <div class="link">
              <p>CODE</p><br/>
              <a href='https://jforj.tistory.com/284' target='_blank'>https://jforj.tistory.com/284</a><br/>
              <a href='https://g1etistory.tistory.com/6' target='_blank'>https://g1etistory.tistory.com/6</a><br/>
              <a href='https://hong6v6.tistory.com/entry/%EC%9A%94%EC%86%8C%EC%9D%98-%EC%A2%8C%ED%91%9C%EA%B0%92-%EA%B5%AC%ED%95%98%EA%B8%B0' target='_blank'>https://hong6v6.tistory.com/entry/..</a><br/>
              <a href='https://minoo.medium.com/%EB%B2%88%EC%97%AD-5%EA%B0%80%EC%A7%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%9E%A5-%EB%8B%A8%EC%A0%90-%EB%B9%84%EA%B5%90-react-animations-in-depth-884ff6e61b88' target='_blank'>https://minoo.medium.com/..</a><br/>
              <a href='https://code-study.tistory.com/77' target='_blank'>https://code-study.tistory.com/77</a><br/>
              <a href='https://curryyou.tistory.com/334' target='_blank'>https://curryyou.tistory.com/334</a><br/>
              <a href='https://velog.io/@mokyoungg/JS-JS%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4%EB%A1%9C-%EA%B7%B8%EB%A6%AC%EA%B8%B0' target='_blank'>https://velog.io/@mokyoungg/JS-JS..</a><br/>
              <p>ETC</p><br/>
              <a href='https://ko.reactjs.org/tutorial/tutorial.html' target='_blank'>https://ko.reactjs.org/tutorial/tutorial.html</a><br/>
              <a href='https://goodmemory.tistory.com/103' target='_blank'>https://goodmemory.tistory.com/103</a><br/>
              <a href='https://violetboralee.medium.com/react%EB%A5%BC-%EB%B0%B0%EC%9A%B0%EA%B8%B0-%EC%A0%84%EC%97%90-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-javascript%EA%B8%B0%EC%B4%88-e0665f8cbee0' target='_blank'>https://violetboralee.medium.com/react..</a><br/>
              <a href='https://immigration9.github.io/react,javascript/2020/07/26/javascript-to-know-for-react.html' target='_blank'>https://immigration9.github.io/react,javascript/2020/07/26/javascript-to-know-for-react.html</a><br/>
              <a href='https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes' target='_blank'>https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes</a><br/>
              <a href='https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage' target='_blank'>https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage</a><br/>
            </div>
          </div>
        </div>


      </body>
    );
  }
}

export default App;
