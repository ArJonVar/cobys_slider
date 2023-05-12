import {useState, useEffect} from "react";
import './ImageSlider.css';
import FilterButtons from "./FilterButtons";
import ImageDisplay from "./ImageDisplay";

const ImageSliderComponent = ({slides}) => {
    // remembers where you are in the set of slides that are visible
    const resetDefaults = {"region":[], "tags":[], "people":[], "services":[], "type":[]}
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    // helps filter the slides you can see (defaults to pics only)
    const [filterState, setFilterState] = useState({"region":[], "tags":[], "people":[], "services":[], "type":["jpg"]});
    // differentiates project and slide options
    const [projectArray, setProjectArray] = useState(slides)
    const [slideArray, setSlideArray] = useState(slides[0].assets)
    // sets trending direction when an arrow is used, and loads the next iframe in that direction
    const [trendingDirection, setTrendingDirection] = useState("->")

    const filterNoResults=[
      {"uid": "666",
      "date": null,
      "project_name": "No Assets Returned",
      "region": "Local Host",
      "assets": [
        {
        "url": "http://localhost:3000/oops.jpg",
        "title": "Try Again", 
        "description": "Filter returned no values!",
        "tags": [],
        "people": [],
        "services": [],
        "type": "jpg"    
        }
      ]
    }
  ]

    function filterSlides(slides, filterObj) {
      let filteredProjects = slides;
  
      // Check if filterObj contains only empty arrays
      const allEmptyArrays = Object.values(filterObj).every(val => Array.isArray(val) && val.length === 0);
  
      // If all values are empty arrays, return the original slides array
      if (allEmptyArrays) {
          return filteredProjects;
      }
  
      // filter regions first because it has a different spot in data structure to filter for
      if (filterObj.region.length !== 0) {
          filteredProjects = slides.filter(slide => filterObj.region.includes(slide.region));
      }
  
      // Otherwise, filter the slides based on the filterObj (other than region)
      const filteredAssetKeys = Object.keys(filterObj).filter(key => key !== 'region' && filterObj[key].length > 0);
      let matchesAnyCondition = false;
      filteredProjects = filteredProjects.map(project => {
          const filteredAssets = project.assets.filter(asset => {
              let assetMatches = true;
              for (const key of filteredAssetKeys) {
                  if (!filterObj[key].some(tag => asset[key].includes(tag))) {
                      assetMatches = false;
                      break;
                  }
              }
              if (assetMatches) {
                  matchesAnyCondition = true;
                  return true;
              }
              return false;
          });
          return {
              ...project,
              assets: filteredAssets
          };
      }).filter(project => project.assets.length > 0); // Remove any project with an empty array for its assets
  
      if (!matchesAnyCondition) {
        console.log('no results')
        return filterNoResults;
      }
      return filteredProjects;
  }

    // rerenders after filters, making sure to change the dataset (enacting the filter)
    useEffect(() => {
      let currentProjectIndexTransition = currentProjectIndex
      const filteredProjects = filterSlides(slides, filterState);
    
      if (filteredProjects.length === 0) {
        setProjectArray(filterNoResults);
        setCurrentSlideIndex(0)
      } else {
        setCurrentSlideIndex(0)
        setProjectArray(filteredProjects);
    
        // Find the index of the first project that has at least one photo after applying the filter
        const firstProjectWithPhotosIndex = filteredProjects.findIndex(
          (project) => project.assets.length > 0
        );
    
        // If there is no project with photos, set the project array to filterNoResults
        if (firstProjectWithPhotosIndex === -1) {
          setProjectArray(filterNoResults);
        } else {
          // Update the current project index if the current project has no photos after applying the filter
          if (filteredProjects[currentProjectIndex]== null){
            setCurrentProjectIndex(0)
            currentProjectIndexTransition = 0 
            setCurrentSlideIndex(0)
            setCurrentProjectIndex(firstProjectWithPhotosIndex);
          }
          else if (filteredProjects[currentProjectIndex].assets.length === 0) {
            setCurrentSlideIndex(0)
            setCurrentProjectIndex(firstProjectWithPhotosIndex);
          }
          else{
          }
        }
      }
      setSlideArray(filteredProjects[currentProjectIndexTransition].assets)
    }, [filterState]);

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
        setSlideArray(projectArray[newIndex].assets)
        setTrendingDirection("<-")
        setCurrentSlideIndex(0)
    }

    const goToNextProject= () => {
        const isLastSlide = currentProjectIndex === projectArray.length - 1;
        const newIndex = isLastSlide ? 0 : currentProjectIndex + 1;
        setCurrentProjectIndex(newIndex);
        setSlideArray(projectArray[newIndex].assets)
        setTrendingDirection("->")
        setCurrentSlideIndex(0)
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

            <ImageDisplay projectArray={projectArray} slideArray ={slideArray} currentSlideIndex={currentSlideIndex} setCurrentSlideIndex={setCurrentSlideIndex} currentProjectIndex={currentProjectIndex} setCurrentProjectIndex={setCurrentProjectIndex} setSlideArray={setSlideArray}/>
            <div>{currentProjectIndex}</div>
            <div>{currentSlideIndex}</div>
            <h5>Filters: {JSON.stringify(filterState)}</h5>
            <h1>Filters</h1>
            <div className ='filterContainer'>
                <FilterButtons data={slides} setFilter={setFilterState} filter={filterState} resetDefaults={resetDefaults} projectArray={projectArray}/>
            </div>
        </div>
    )
}

export default ImageSliderComponent;