
import useStore from '../store';
import '../App.css';
import React, { useState, useRef, useEffect, isStart } from 'react';
import Registeration from './modal';
const { dataArr, setDataArr } = useStore();


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

export default function MapCanvas ({width, height}){
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
    image.src = '126588db9d20e18ebae80ad547e784ffc25c2e2a62d41e2e0d6bc0ec45bf77c4e0dc3f757cd2ea5e1690ace9288f424edb6f0c5bfd5da345f4b4c254e6d12960f9f75cf5ba5e334e66829eed9f2ce63901c5a836d784111b168b62452c5dcd79a2c99fcf61bacd7d6b5de508b379815c';
   
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
      pointArr.push(PointData(e.clientX - rect.left, e.clientY - rect.top, 10, 10));
      console.log(pointArr);
    }
  };

  const handleMouseMove = e => {
    if (ctx) {
      var rect = canvas.current.getBoundingClientRect();
      
      ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 10, 10);
      console.log(e.clientX - rect.left, e.clientY - rect.top)
    }
  };
  
    return <canvas ref={canvas} width = {width} height = {height} onclick = {handleMouseClickArc}/>
  };