import {useState} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filter, setFilter] = useState({});

    console.log(slides)

    function filterSlides(slides, filterObj) {
        const filtered = [];
        for (const data_index in slides) {
            console.log('dataitems', slides[data_index])
            for (const data_key in filterObj){
                console.log('data_keys', data_key)
                if (Object.keys(filterObj).length === 0 || Object.values(filterObj).every(value => Array.isArray(value) && value.length === 0)) {
                    // if(slides.IndexOf(slides[data_index]) === -1){
                    filtered.push(slides[data_index]);
                    // }
                }
                else if (slides[data_index].hasOwnProperty(data_key) && filterObj.hasOwnProperty(data_key)) {
                    if(filterObj[data_key].includes(slides[data_index][data_key]) && filtered.indexOf(slides[data_index]) === -1){
                        filtered.push(slides[data_index])
                    }}
            }
        }
        return filtered;
    }

    // const filteredSlides = filterSlides(slides, filter)
    const filteredSlides = slides
    const testSlides = filterSlides(slides, filter)


    console.log('test', filteredSlides)

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? filteredSlides.length -1 : currentIndex -1
        setCurrentIndex(newIndex)
    }

    const goToNext= () => {
        const isLastSlide = currentIndex === filteredSlides.length - 1;
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
            {filteredSlides[currentIndex].type === 'jpg' ? (
                <div className= 'slideJPG' style= {{backgroundImage: `url(${filteredSlides[currentIndex].url})`}}></div>
                ) : (
                <iframe className = 'slideIframe' src={filteredSlides[currentIndex].url} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title='iframe'></iframe>
                )}
            <div className = 'dotsContainer'>
                {filteredSlides.map((slide, slideIndex) => (
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