import {useState, useEffect} from "react";
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
    // helps with pre-load by sensing if its time to display the hidden preloaded iframe
    const [iFrameActive, setIFrameActive] = useState(false);
    const [nextIframeUrl, setNextIframeUrl] = useState("")
    // sets trending direction when an arrow is used, and loads the next iframe in that direction
    const [trendingDirection, setTrendingDirection] = useState("->")

    const filterNoResults=[{    
        "type": "jpg",    
        "url": "http://localhost:3000/oops.jpg",    
        "title": "Try Again",    
        "filter": "DCT",
        "list": []
    }]

    function filterSlidesAnd(slides, filterObj) {
        // Check if filterObj contains only empty arrays
        const allEmptyArrays = Object.values(filterObj).every(val => Array.isArray(val) && val.length === 0);
        
        // If all values are empty arrays, return the original slides array
        if (allEmptyArrays) {
          return slides;
        }
      
        // Otherwise, filter the slides based on the filterObj
        const filteredSlides = slides.filter(slide => {
          //if the filter object is totally blank, a filter was never set, just return all slides
          if (Object.keys(filterObj).length === 0) {
            return true;
          }
          let matchesAnyCondition = false;
          for (const key in filterObj) {
            if (Array.isArray(slide[key])) {
              if (filterObj[key].length > 0) {
                const filteredArray = slide[key].filter(item => filterObj[key].includes(item));
                if (filteredArray.length > 0) {
                  matchesAnyCondition = true;
                }
              }
            } else if (filterObj[key].length > 0 && slide[key] === filterObj[key][0]) {
              matchesAnyCondition = true;
            }
          }
          return matchesAnyCondition;
        });
        return filteredSlides;
    }

    // finds the next iframe for preloading
    function findNextIframe(filteredSlides, currentIndex) {
        // Loop through the remaining slides starting from currentIndex + 1
        for (let i = currentIndex; i < filteredSlides.length; i++) {
          // If the slide's type is 'iframe', return its index
          if (filteredSlides[i].type === 'iframe') {
            if (filteredSlides[i].url !== nextIframeUrl) {
                setNextIframeUrl(filteredSlides[i].url);
            }
            break;
        }
        // If it's the last slide and no iframe is found, try looking backwards
        if (i === filteredSlides.length - 1) {
          for (let j = 0; j < currentIndex; j++) {
            if (filteredSlides[j].type === 'iframe') {
              if (filteredSlides[j].url !== nextIframeUrl) {
                setNextIframeUrl(filteredSlides[j].url);
              }
              break;
            }
          }
        }
        }
      }
    function findPreviousIframe(filteredSlides, currentIndex) {
      // Loop through the previous slides starting from currentIndex - 1
        for (let i = currentIndex; i >= 0; i--) {
          // If the slide's type is 'iframe', return its index
          if (filteredSlides[i].type === 'iframe') {
            if (filteredSlides[i].url !== nextIframeUrl) {
              setNextIframeUrl(filteredSlides[i].url);
            }
            break;
          }
        // If it's the first slide and no iframe is found, try looking forwards
        if (i === 0) {
            for (let j = filteredSlides.length - 1; j >= currentIndex; j--) {
              if (filteredSlides[j].type === 'iframe') {
                if (filteredSlides[j].url !== nextIframeUrl) {
                  setNextIframeUrl(filteredSlides[j].url);
                }
                break;
              }
            }
        }
      }
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
            //change the preloaded iframe if we are on an iframe
            console.log(trendingDirection)
            if (filteredSlides[currentIndex].type !== 'iframe') {
                if (trendingDirection === "<-"){
                    findPreviousIframe(filteredSlides, currentIndex);
                } else if (trendingDirection === "->"){
                    findNextIframe(filteredSlides, currentIndex);
                }
              }
        if (currentIndex >= filteredSlides.length){
            console.log("index reset")
            setCurrentIndex(0); // add setCurrentIndex to dependency array
        }
        // setting if the preloaded iframe should be visible
        else if (filteredSlides[currentIndex].type === 'iframe'){
            setIFrameActive(true)
        } else {
            setIFrameActive(false)
        }
        }
        // this leaves out filterNoResults on purpose b/c that causes infinite rerender
    }, [slides, filterState, setCurrentIndex, currentIndex, nextIframeUrl, trendingDirection]);

    useEffect(() => {
        console.log('website changed to', nextIframeUrl)
      }, [nextIframeUrl]);
    
    const goToPrevious = () => {
        if (currentIndex === 0 && filteredSlides[filteredSlides.length - 1].type === 'iframe') {
            findPreviousIframe(filteredSlides, filteredSlides.length - 1);
        } else if (filteredSlides[currentIndex - 1].type === 'iframe') {
            findPreviousIframe(filteredSlides, currentIndex - 1);
        }
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? filteredSlides.length -1 : currentIndex -1
        setCurrentIndex(newIndex)
        setTrendingDirection("<-")
    }

    const goToNext= () => {
        if (filteredSlides[currentIndex].type === 'iframe') {
            findNextIframe(filteredSlides, currentIndex);
        }
        const isLastSlide = currentIndex === filteredSlides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setTrendingDirection("->")
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
                    </div>
                    ) : (
                    <div>
                        <img 
                        className= 'slideJPG' 
                        alt="iframe-whitespace"
                        src="http://localhost:3000/white.jpg"
                        />
                    </div>
                    )}
                    {/* <div>Width: {width}px</div>
                    <div>Height: {height}px</div> */}
                    <iframe 
                    title='iframe'
                    onLoad={assessImgSize} 
                    className={`slideIframe${iFrameActive ? 'Active' : 'Hidden'}`} 
                    src={nextIframeUrl}
                    allowfullscreen="true" 
                    webkitallowfullscreen="true" 
                    mozallowfullscreen="true" 
                    ></iframe>
                <div className = 'dotsContainer'>
                    {filteredSlides.map((slide, slideIndex) => (
                        <div key={slideIndex} className='dot' onClick={() => goToSlide(slideIndex)}>●</div>
                    ))}
                </div>
            {/* <h5>image metadata: {JSON.stringify(filteredSlides[currentIndex])}</h5>
            <h5>Filters: {JSON.stringify(filterState)}</h5>
            <h5>Filters: {filteredSlides.length}</h5> */}
            <h1>Filters</h1>
            <div className ='filterContainer'>
                <FilterButtons data={slides} setFilter={setFilterState} filter={filterState}/>
            </div>
        </div>
    )
}

export default ImageSlider;