//******IMMPPPPPORTAAAAANNNTTTTT */
//img id="myimg1" is reference image,use different images to check 
//pressss button to start,play video ,check console 
//will take upto 30 seconds to start
import React, { Component,useEffect,useState } from 'react';
import './App.css';
import * as canvas from 'canvas';
import {defaultimage} from "./image/imag.png" 
import VideoRecorder from 'react-video-recorder'

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
   
 constructor(props){
super();
this.state={
  detections:""
}  
this.handlec=this.handlec.bind(this)
 }
 
 
  componentWillMount=async ()=>{
//   await faceapi.loadSsdMobilenetv1Model('/weights');

//   await faceapi.loadFaceExpressionModel('/weights');
   
   this.detectionNet = faceapi.nets.ssdMobilenetv1; 
   this.detectnet1=faceapi.nets.faceLandmark68Net;
   this.detectnet2=faceapi.nets.faceRecognitionNet;
   await this.detectionNet.load('/weights');
   await this.detectnet1.load('/weights')
   await this.detectnet2.load('/weights')
   
   await faceapi.loadAgeGenderModel('/weights'); //place after detectionNet 
   await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
   await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
   await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
   await faceapi.loadFaceLandmarkModel('/weights')
   await faceapi.loadFaceRecognitionModel('/weights')
   //await faceapi.loadTinyFaceDetectorModel('/weights')
  }

// handleclick= async ()=>{
//  const minConfidence=0.5
// //  const faceapiOptions= await new faceapi.SsdMobilenetv1Options({minConfidence}); //not important

//   //const input=document.getElementById("myimg");
//   //const detections =await faceapi.detectSingleFace(input)
//   const input='myimg'//dummy is myimg and myimg1  is my pic 
//  // const detections1 = await faceapi.detectSingleFace(input, faceapiOptions)
//   const detections1 = await faceapi.detectSingleFace(input).withAgeAndGender()
  
//  console.log(detections1)
// console.log('after')


// }

// handleclick= async ()=>{
//   const minConfidence=0.5
//    const faceapiOptions= await new faceapi.SsdMobilenetv1Options({minConfidence});
//    //const input=document.getElementById("myimg");
//    //const detections =await faceapi.detectSingleFace(input)
//    const input='myimg'//dummy is myimg and myimg1  is my pic 
//    const input1='myimg1'
//    // const detections1 = await faceapi.detectSingleFace(input, faceapiOptions)
//    //const detections1 = await faceapi.detectSingleFace(input).withAgeAndGender()
   
//   //console.log(detections1)
 
//  const results = await faceapi
//  .detectAllFaces(input)
//  .withFaceLandmarks()
//  .withFaceDescriptors()

// if (!results.length) {
//  return
// }

// // create FaceMatcher with automatically assigned labels
// // from the detection results for the reference image
// const faceMatcher = new faceapi.FaceMatcher(results)
// const singleResult = await faceapi
//  .detectSingleFace(input1)
//  .withFaceLandmarks()
//  .withFaceDescriptor()

// if (singleResult) {
//  const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
//  console.log(bestMatch.toString())
// }

 
//  }



async handlec(videoblob){
  
  // const minConfidence=0.2
  // const faceapiOptions= await new faceapi.SsdMobilenetv1Options({minConfidence});
   const input=document.getElementById("vid");
  const input1=document.getElementById('myimg1')
  const minConfidence=0.6
   const faceapiOptions= await new faceapi.SsdMobilenetv1Options({minConfidence})
  // console.log(input)
  // //const detections =await faceapi.detectSingleFace(input)
  //  const detections=await faceapi.detectAllFaces(input,new faceapi.TinyFaceDetectorOptions()).then(()=>console.log("abe la")).catch((err)=>console.log(err))
  // console.log(detections)
  

 
   input.addEventListener('play',async ()=>{
  
   //document.getElementById("vid").appendChild(canvas)
    console.log("video played")
   setInterval(async ()=>{
      //  const detections=await faceapi.detectAllFaces(input)
      //  console.log(detections)    
     
  
      const results = await faceapi
 .detectAllFaces(input)
 .withFaceLandmarks()
 .withFaceDescriptors()
console.log(results)
if (!results.length) {
 return
}

// create FaceMatcher with automatically assigned labels
// from the detection results for the reference image
const faceMatcher = new faceapi.FaceMatcher(results)
const singleResult = await faceapi
 .detectSingleFace(input1)
 .withFaceLandmarks()
 .withFaceDescriptor()

if (singleResult) {
 const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
let det=bestMatch.toString().slice(0,7)
 console.log(bestMatch.toString())
 this.setState({detections:det}) 
}
      
},700)
       
   }) 
 
navigator.getUserMedia(
  { video:{}},
  stream => input.srcObject=stream,
  err => console.log(err)
 
  
)

 }
 



render(){
  console.log(faceapi.nets);
  return (
    <div id="App">
     
      <br/>
      <div className="left">
      <div id="startbutton">

        </div>
        <video id="preview" width="160" height="120" autoplay muted></video>
      </div>

      <div className="right">
      <div className="stop">

      </div>
      <video id="recording" width="160" height="120" ></video>
      </div>
      
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><h2>{ this.state.detections.search("person")!=-1 ? (<span style={{color:"green"}}>Person Matched</span>):(<span style={{color:"red"}}>Unknown did not match</span>) }</h2></div>)
      <div style={{display:"flex",width:"900",justifyContent:"space-around"}} > 
      <video controls autoplay muted  id="vid" width="300" height="300" ></video>
      <div style={{display:"block",justifyContent:"flex-end"}}>  <img  id="myimg1"  src={require('./image/img.jpg')} height={230} width={220}/> <br/><h3>Reference image </h3> </div> 
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={this.handlec} >PRESSSSSS </button>
   </div>
  );
  }
}

export default App;
