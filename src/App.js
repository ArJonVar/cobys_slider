import './App.css';
import ImageSlider from "./ImageSlider";

function App() {
  const slides = [
    {type: 'jpg', url:'http://localhost:3000/image-1.jpg', title:'Thor', filter:"A"},
    {type: 'jpg', url:'http://localhost:3000/image-2.jpg', title:'Coby', filter:"A"},
    {type: 'jpg', url:'http://localhost:3000/image-3.jpg', title:'Dablam', filter:"B"},
    {type: 'jpg', url:'http://localhost:3000/image-4.jpg', title:'Tenzing', filter:"A"},
    {type: 'jpg', url:'http://localhost:3000/image-5.jpg', title:'Bridge', filter:"B"},
    {type: 'jpg', url:'http://localhost:3000/image-5.jpg', title:'Bridge', filter:"A"},
    {type: 'iframe', url:'https://dowbuilt1.autodesk360.com/shares/public/SH919a0QTf3c32634dcf4e67020582d7a356?mode=embed', title:'autodesk', filter:"A"},
    {type: 'iframe', url:'https://dowbuilt.egnyte.com/dl/nL9EckmCPM?mode=embed', title:'egnyte', filter:"B"},

  ]
  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto',
  }
  return (
    <div className="App">
      <h1>Ariel's Test</h1>
        <div style={containerStyles}>
          <ImageSlider slides = {slides}/>
        </div>
    </div>
  );
}

export default App;
