import {useState} from "react";
import './ImageSlider.css';

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div class = 'sliderContainer'>
            <div class = 'leftArrow' onClick = {goToPrevious} >❰</div>
            <div class = 'rightArrow' onClick = {goToNext}>❱</div>
            {slides[currentIndex].type === 'jpg' ? (
        <div class= 'slideJPG' style= {{backgroundImage: `url(${slides[currentIndex].url})`}}></div>
      ) : (
        <iframe class = 'slideIframe' src={slides[currentIndex].url} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title='iframe'></iframe>
      )}
            <div class = 'dotsContainer'>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} class='dot' onClick={() => goToSlide(slideIndex)}>●</div>
                ))}
            </div>
            
        </div>
    )
}

export default ImageSlider;