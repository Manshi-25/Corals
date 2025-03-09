import React, { useState, useRef } from 'react';
    import coralReefImage from './co.jpg'; // Import the image

    function App() {
      const [image, setImage] = useState(null);
      const [webcamStream, setWebcamStream] = useState(null);
      const videoRef = useRef(null);

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setWebcamStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
          alert("Could not access webcam. Please ensure you have given permission.");
        }
      };

      const handleStopWebcam = () => {
        if (webcamStream) {
          webcamStream.getTracks().forEach(track => track.stop());
          setWebcamStream(null);
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      };

      return (
        <div>
          <header className="header">
            <h1>Coral Reef Health Detection</h1>
          </header>

          <main className="main-content">
            <section className="image-upload-section" style={{height:'13rem'}}>
              <h2 style={{paddingTop:'10px'}}>Upload Image</h2>
              {image && (
                <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} />
              )}
              {webcamStream ? (
                <div>
                  <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} />
                  <button className="webcam-button" onClick={handleStopWebcam}>Stop Webcam</button>
                </div>
              ) : (
                
                <div style={{paddingTop:'20px' , border:'2px solid rgba(0, 0, 0, 0.1)', borderRadius:'8px',boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',height:'40%',marginLeft:'18rem',marginRight:'18rem'}}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="file-upload" />
                  <label htmlFor="file-upload" className="upload-button" >Upload Image</label>
                </div>
                
              )}
            </section>

            <section className="details-section">
              <h1 className='' style={{color:'black' , textAlign:'center'}}>Protecting Coral Reefs With Technology</h1>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',paddingTop:'5px', height:'30rem'}}>

              <div className='heading' style={{width:'200%',paddingTop:'10px' ,height:'100%'}}>
                <img src={coralReefImage} alt="Coral Reef" style={{ maxWidth: '100%', height: 'auto',width:'auto', marginBottom: '10px', borderRadius: '8px' }} />
              </div>

              <div>
              <h2 style={{color:'black'}}>Why Coral Reef Health Matters</h2>
              <p style={{color : 'black'}}>
              Coral reefs are among the most valuable ecosystems on Earth, supporting approximately 25% of marine life while covering less than 1% of the ocean floor. They provide food security, coastal protection, and economic benefits to millions of people.
              Yet these vital ecosystems face unprecedented threats from climate change, pollution, and unsustainable fishing practices. Monitoring coral reef health is essential for effective conservation and management.
              </p>
              <p style={{color : 'black'}}>
                The analysis may include identifying signs of coral bleaching, disease, or damage. The goal is to provide a simple and accessible tool
                for anyone interested in coral reef conservation.
              </p>
              <h3 className='' style={{color:'black' , text:'center'}}>Our Technology</h3>
              <h5 style={{color:'black'}}>Global Reef Monitoring :</h5>
              <p style={{color : 'black'}}>
              Track coral reef health across the globe with our comprehensive database of reef ecosystems and historical health trends.
              </p>
              <h5 style={{color:'black'}}>Conservation Insights :</h5>
              <p style={{color : 'black'}}>
              Gain actionable insights for coral reef conservation efforts with detailed reports and recommendations based on analysis results.</p>
              </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <p>&copy; 2024 Coral Reef Health Detection</p>
          </footer>
        </div>
      );
    }

    export default App;
