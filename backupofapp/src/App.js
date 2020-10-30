import React, { Component } from 'react';
import './App.css';
import * as canvas from 'canvas';
import {defaultimage} from "./image/imag.png" 
import * as faceapi from 'face-api.js';
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img')
});
class App extends Component{
   
  componentWillMount=async ()=>{
 const net =await new faceapi.SsdMobilenetv1()
 
   await net.loadFromUri('/weights')
//   await faceapi.loadSsdMobilenetv1Model('/weights');

//   await faceapi.loadFaceExpressionModel('/weights');
   
   this.detectionNet = faceapi.nets.ssdMobilenetv1; 
   await this.detectionNet.load('/weights');
   await faceapi.loadAgeGenderModel('/weights'); //place after detectionNet 
  }

handleclick= async ()=>{
 const minConfidence=0.5
  const faceapiOptions= await new faceapi.SsdMobilenetv1Options({minConfidence});

  //const input=document.getElementById("myimg");
  //const detections =await faceapi.detectSingleFace(input)
  const input='myimg'//dummy is myimg and myimg1  is my pic 
 // const detections1 = await faceapi.detectSingleFace(input, faceapiOptions)
  const detections1 = await faceapi.detectSingleFace(input).withAgeAndGender()
  
 console.log(detections1)
console.log('after')
}

  
render(){
  console.log(faceapi.nets);
  return (
    <div className="App">
      <img id="myimg" height={100} width={100} crossorigin="anonymous" src="https://images.squarespace-cdn.com/content/v1/52a1b3bfe4b05a96c7788819/1454893689840-D4VOBMU2AYYCN9PIAOT1/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/nenezic-random.jpg?format=1500w" />
      <button onClick={this.handleclick}> Press </button>
      <img id="myimg1" src={require('./image/img.jpg')} height={100} width={100}/>
      
          </div>
  );
  }
}

export default App;
