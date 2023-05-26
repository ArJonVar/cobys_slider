import './App.css';
import ImageSliderComponent from "./ImageSliderComponent";
import data from './data.json';



function App() {
  
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    console.log('DATA', data);
  });
  
  const containerStyles = {
    width: '800px',
    height: '400px',
    margin: '0 auto',
  }
  return (
    <div className="App">
      <h1>Ariel's Test</h1>
        <div style={containerStyles}>
          <ImageSliderComponent slides = {data}/>
        </div>
    </div>
  );
}

export default App;
