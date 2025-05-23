import React, { useState } from 'react'

const Qrcode = () => {
const [img , setImg] =useState();
const [load , setload] =useState(false);
const[ data , setdata] =useState();
const[ size , setsize] =useState();
   

   function downloadQr() {
    fetch(img)
    .then((response) => response.blob())
    .then((blob) =>{
      const link =document.createElement("a");
      link.href =URL.createObjectURL(blob);
      link.download="Qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

   }
  
   async function generateQr(){
    setload(true);
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)} `;
      setImg(url);
    } 
    catch (error) 
    {
      console.error("Error generating Qr code", error)
    } finally
    {
      setload(false);
    }
  }
  return ( 
<div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {load && <p>please wait..</p>}

    {img && <img src={img} alt="qrcode" className='Qrimage' />}


     
  <div>
      <label htmlFor="dataInput" className='lable-Input'>Data for Qr code:</label>

    <input type="text"  
    value={data} id='dataInput' 
    placeholder='Enter data for Qr code' 
    onChange={(e) => setdata(e.target.value)}
    disabled={load} />


    <label htmlFor="sizeInput" className='lable-Input'  >Image size (e.g., 150):</label>

    <input type="text" 
     id='sizeInput' 
     value={size} 
     onChange={(e =>setsize(e.target.value))} 
     placeholder='enter image size' />

    <button className='genrate' onClick={generateQr}>Generate Qr code</button>
    <button className='download' onClick={downloadQr}>Download Qr code</button>
  </div>

     <p className='footer'>Designed By <a href="#">Ai</a></p>
</div>
  )
}

export default Qrcode
