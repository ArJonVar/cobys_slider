import './ImageSlider.css';

const ImageDisplay = ({projectArray, slideArray, currentSlideIndex,setCurrentSlideIndex, currentProjectIndex, setCurrentProjectIndex, setSlideArray}) => {
    // To make sure it can load while the state is still undefined
    let projectArrayLoaded = []

    if (typeof projectArray !== 'undefined') {projectArrayLoaded = projectArray}

    const filterNoResults=[{       
        "url": "http://localhost:3000/oops.jpg",    
        "title": "Try Again", 
        "description": "they asked for something not filterable",
        "tags":[],
        "people":[],   
        "type": "jpg", 
    }]
    
    const goToSlide = (slideIndex) => {
        setCurrentSlideIndex(slideIndex)
    }
    
    const goToProject = (slideIndex) => {
        setCurrentProjectIndex(slideIndex)
        setSlideArray(projectArray[slideIndex].assets)
    }
    
    return(
        <div>
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
            {projectArrayLoaded.map((project, projectIndex) => (
                    <button key={project.uid} className={`project_nav${(projectIndex === currentProjectIndex) ? '_current' : ''}`} onClick={() => goToProject(projectIndex)}>{project.project_name}</button>
                ))}
        </div>
    )
}

export default ImageDisplay;