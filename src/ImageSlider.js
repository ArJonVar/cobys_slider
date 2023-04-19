import {useState} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filter, setFilter] = useState({});

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1
        setCurrentIndex(newIndex)
    }

    const goToNext= () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }


    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return(
        <div className = 'sliderContainer'>
            <div className = 'leftArrow' onClick = {goToPrevious} >❰</div>
            <div className = 'rightArrow' onClick = {goToNext}>❱</div>
            {slides[currentIndex].type === 'jpg' ? (
        <div className= 'slideJPG' style= {{backgroundImage: `url(${slides[currentIndex].url})`}}></div>
      ) : (
        <iframe className = 'slideIframe' src={slides[currentIndex].url} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title='iframe'></iframe>
      )}
            <div className = 'dotsContainer'>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className='dot' onClick={() => goToSlide(slideIndex)}>●</div>
                ))}
            </div>
        <h3>Filters: {JSON.stringify(filter)}</h3>
        <h1>Filters</h1>
        <div className ='filterContainer'>
            <FilterButtons data={slides} setFilter={setFilter} filter={filter}/>
        </div>
        </div>
    )
}

export default ImageSlider;