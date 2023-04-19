import './App.css';
import ImageSlider from "./ImageSlider";
import data from './data.json';



function App() {
  
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
  
  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto',
  }
  return (
    <div className="App">
      <h1>Ariel's Test</h1>
        <div style={containerStyles}>
          <ImageSlider slides = {data}/>
        </div>
    </div>
  );
}

export default App;
