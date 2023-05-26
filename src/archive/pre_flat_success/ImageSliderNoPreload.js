import {useState, useEffect, useRef} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";

const ImageSlider = ({slides}) => {
    // remembers where you are in the set of slides that are visible
    const [currentIndex, setCurrentIndex] = useState(0);
    // helps filter the slides you can see
    const [filterState, setFilterState] = useState({});
    const [filteredSlides, setFilteredSlides] = useState(slides)
    // helps get the size of image for resizing
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const filterNoResults=[{    
        "type": "jpg",    
        "url": "http://localhost:3000/oops.jpg",    
        "title": "Try Again",    
        "filter": "DCT",
        "list": []
    }]

    function filterSlidesAnd(slides, filterObj) {
        const filteredSlides = slides.filter(slide => {
            //if the filter object is totally blank, a filter was never set, just return all slides
            if (Object.keys(filterObj).length === 0) {
                return true
            }
            for (const key in filterObj) {
              if (Array.isArray(slide[key])) {
                if (filterObj[key].length > 0) {
                  const filteredArray = slide[key].filter(item => filterObj[key].includes(item));
                  if (filteredArray.length === 0) {
                    return false;
                  }
                }
              } else if (filterObj[key].length > 0 && slide[key] !== filterObj[key][0]) {
                return false;
              }
            }
            return true;
          });
          return filteredSlides;
        }
    
    // useEffect makes sure to rerender components correctly after a render, specificially, it makes sure to reset the index to zero when ever the filter changes
    // (so if you were on index 5 but your filtered list now is an array of length 3 it doesnt error out)
    useEffect(() => {
        const filteredSlides = filterSlidesAnd(slides, filterState);
        // controls for if the filter is about to return nothing, returns the case that is designed for when there is no returns
        if(filteredSlides.length === 0){
            setFilteredSlides(filterNoResults);
        }
        //returns filtered array if it exists
        else {
            setFilteredSlides(filteredSlides);
        }
        if (currentIndex >= filteredSlides.length){
            console.log("index reset")
            setCurrentIndex(0); // add setCurrentIndex to dependency array
        }
        // this leaves out filterNoResults on purpose b/c that causes infinite rerender
    }, [slides, filterState, setCurrentIndex, currentIndex]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? filteredSlides.length -1 : currentIndex -1
        setCurrentIndex(newIndex)
    }

    const goToNext= () => {
        const isLastSlide = currentIndex === filteredSlides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }


    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    const assessImgSize = (event) => {
        setWidth(event.target.naturalWidth);
        setHeight(event.target.naturalHeight);
      };

    return(
        <div className = 'sliderContainer'>
            {filteredSlides.length > 1 ? (
            <div>
            <div className = 'leftArrow' onClick = {goToPrevious} >❰</div>
            <div className = 'rightArrow' onClick = {goToNext}>❱</div>
            </div>
            ):(
            <div></div>)}
                {filteredSlides[currentIndex].type === 'jpg' ? (
                    <div>
                        <img 
                        className= 'slideJPG' 
                        alt="carousel"
                        onLoad={assessImgSize}
                        src={`${filteredSlides[currentIndex].url}`}
                        />
                        {/* <div>Width: {width}px</div>
                        <div>Height: {height}px</div> */}
                    </div>
                    ) : (
                    <iframe 
                        className = 'slideIframe' 
                        src={filteredSlides[currentIndex].url} 
                        allowfullscreen="true" 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true" 
                        title='iframe'
                        ></iframe>
                    )}
                <div className = 'dotsContainer'>
                    {filteredSlides.map((slide, slideIndex) => (
                        <div key={slideIndex} className='dot' onClick={() => goToSlide(slideIndex)}>●</div>
                    ))}
                </div>
            {/* <h5>image metadata: {JSON.stringify(filteredSlides[currentIndex])}</h5>
            <h5>Filters: {JSON.stringify(filterState)}</h5>
            <h5>Filters: {filteredSlides.length}</h5>
            <h1>Filters</h1> */}
            <div className ='filterContainer'>
                <FilterButtons data={slides} setFilter={setFilterState} filter={filterState}/>
            </div>
        </div>
    )
}

export default ImageSlider;