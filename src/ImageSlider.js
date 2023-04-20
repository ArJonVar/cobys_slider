import {useState, useEffect} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filter, setFilter] = useState({});
    const [filteredSlides, setFilteredSlides] = useState(slides)

    function filterSlides(slides, filterObj) {
        const filtered = [];
        //if the filter object is totally blank, a filter was never set, just return all slides
        if (Object.keys(filterObj).length === 0) {
            // console.log("never set filter")
            return slides
        }
        for (const data_index in slides) {
            for (const data_key in filterObj){
                // if there is no filter (because filter options are blank in all places, just return all slides)
                if (Object.values(filterObj).every(value => Array.isArray(value) && value.length === 0)) {
                    // console.log("no filter")
                    return slides
                }
                // if there is a filter that can be found in both the filter object and slides, map out values that match the filter and push them into new filtered array
                else if (slides[data_index].hasOwnProperty(data_key) && filterObj.hasOwnProperty(data_key)) {
                    if(filterObj[data_key].includes(slides[data_index][data_key]) && filtered.indexOf(slides[data_index]) === -1){
                        filtered.push(slides[data_index])
                    }
                    // if there is a filter for a key/value of original data whose value is a list, but we are just looking for a minimum of one match (one item in filter matching one item in value list)
                    else if (filterObj[data_key].some(item => slides[data_index][data_key].includes(item)) && filtered.indexOf(slides[data_index]) === -1){
                        filtered.push(slides[data_index])
                }}
            }
        }
        return filtered;
    }

    // useEffect makes sure to rerender components correctly after a render, specificially, it makes sure to reset the index to zero when ever the filter changes
    // (so if you were on index 5 but your filtered list now is an array of length 3 it doesnt error out)
    useEffect(() => {
        const filteredSlides = filterSlides(slides, filter);
        setFilteredSlides(filteredSlides);
        if (currentIndex >= filteredSlides.length){
            console.log("index reset")
            setCurrentIndex(0); // add setCurrentIndex to dependency array
        }
    }, [slides, filter, setCurrentIndex, currentIndex]);

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
            <h2>Filters: {filteredSlides.length}</h2>
            <h1>Filters</h1>
            <div className ='filterContainer'>
                <FilterButtons data={slides} setFilter={setFilter} filter={filter}/>
            </div>
        </div>
    )
}

export default ImageSlider;