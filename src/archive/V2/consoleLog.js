import {useState, useEffect} from "react";

const Log = ({currentSlideIndex, currentProjectIndex, projectArray, slideArray, trendingDirection}) => {
    console.log("LOG")
    console.log(currentSlideIndex, currentProjectIndex, projectArray, slideArray, trendingDirection)
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
  
    return(null)
}
export default Log;