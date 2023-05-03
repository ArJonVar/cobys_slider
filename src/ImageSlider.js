import {useState, useEffect} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";

const ImageSlider = ({slides}) => {
    // remembers where you are in the set of slides that are visible
    const resetDefaults = {"type":["jpg"]}
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    // helps filter the slides you can see (defaults to pics only)
    const [filterState, setFilterState] = useState(resetDefaults);
    // differentiates project and slide options
    const [projectArray, setProjectArray] = useState(slides)
    const [filteredProjectArray, setFilteredProjectArray] = useState(slides)
    const [slideArray, setSlideArray] = useState(slides[0].assets)
    const [filteredSlideArray, setFilteredSlideArray] = useState(slides)
    // sets trending direction when an arrow is used, and loads the next iframe in that direction
    const [trendingDirection, setTrendingDirection] = useState("->")
    
    useEffect(() => {
      // code to run once when component initially loads
      console.log(projectArray[currentProjectIndex].project_name, 'STARTUP SLIDES', slideArray)
    }, []);

    useEffect(() => {
      console.log(
        {'Proj info':
          {'Project Name':projectArray[currentProjectIndex].project_name,
          'Picture Name':slideArray[currentSlideIndex].title},
        'slide info':
          {'last project': currentProjectIndex === projectArray.length - 1, 
          'first project': currentProjectIndex === 0,
          'last slide': currentSlideIndex === slideArray.length - 1,
          'first slide': currentProjectIndex === 0,
          'p index':currentProjectIndex,
          's index':currentSlideIndex},
        'slides':
          {'projects':projectArray,
          'slides':slideArray},
        'trending':trendingDirection
        })
    }, [currentSlideIndex, currentProjectIndex, projectArray, slideArray, trendingDirection]);

    const goToPrevious = () => {
        const isFirstSlide = currentSlideIndex === 0;
        const newIndex = isFirstSlide ? slideArray.length -1 : currentSlideIndex -1
        setCurrentSlideIndex(newIndex)
        setTrendingDirection("<-")
    }

    const goToNext= () => {
        const isLastSlide = currentSlideIndex === slideArray.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlideIndex + 1;
        setCurrentSlideIndex(newIndex);
        setTrendingDirection("->")
    }

    const goToPreviousProject = () => {
        const isFirstSlide = currentProjectIndex === 0;
        const newIndex = isFirstSlide ? projectArray.length -1 : currentProjectIndex -1
        setCurrentProjectIndex(newIndex)
        setSlideArray(slides[newIndex].assets)
        setTrendingDirection("->")
    }

    const goToNextProject= () => {
        const isLastSlide = currentProjectIndex === projectArray.length - 1;
        const newIndex = isLastSlide ? 0 : currentProjectIndex + 1;
        setCurrentProjectIndex(newIndex);
        setSlideArray(slides[newIndex].assets)
        setTrendingDirection("->")
    }

    const goToSlide = (slideIndex) => {
        setCurrentSlideIndex(slideIndex)
    }

    return(
        <div className = 'sliderContainer'>
            {slideArray.length > 1 ? (
            <div>
            <div className = 'leftArrow' onClick = {goToPrevious} >❰</div>
            <div className = 'rightArrow' onClick = {goToNext}>❱</div>
            </div>
            ):(
            <div></div>)}
            {projectArray.length > 1 ? (
            <div>
            <div className = 'PleftArrow' onClick = {goToPreviousProject}>❰P</div>
            <div className = 'PrightArrow' onClick = {goToNextProject}>P❱</div>
            </div>
            ):(
            <div></div>)}

            {slideArray[currentSlideIndex].type === 'jpg' ? (
                <div>
                    <img 
                    className= 'slideJPG' 
                    alt="carousel"
                    src={`${slideArray[currentSlideIndex].url}`}
                    />
                </div>
                ) : (
                <iframe 
                  title='iframe'
                  className= 'slideJPG' 
                  src={`${slideArray[currentSlideIndex].url}`}
                  allowfullscreen="true" 
                  webkitallowfullscreen="true" 
                  mozallowfullscreen="true" 
                ></iframe>
                )}
            <div className = 'dotsContainer'>
                {slideArray.map((slide, slideIndex) => (
                    <div key={slideIndex} className='dot' onClick={() => goToSlide(slideIndex)}>●</div>
                ))}
            </div>
            <div>{currentProjectIndex}</div>
            <div>{currentSlideIndex}</div>
            <h5>Filters: {JSON.stringify(filterState)}</h5>
            <h1>Filters</h1>
            <div className ='filterContainer'>
                <FilterButtons data={slides} setFilter={setFilterState} filter={filterState} resetDefaults={resetDefaults}/>
            </div>
        </div>
    )
}

export default ImageSlider;