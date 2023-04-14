import {useState} from "react";

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height:'100%',
        position:'relative'
    }
    const slideJPGStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`
    }
    const slideIFrameStyles = {
        src:`${slides[currentIndex].url}`,
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: "center",
        backgroundSize: "cover",
        // maybe
        allowFullScreen:true,
        webkitAllowFullScreen:true,
        MozallowFullScreen:true,
        frameBorder:0
    }

    const leftArrowStyles = {
        position: 'absolute',
        top:'50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '45px',
        color:'#000',
        zIndex: 1,
        cursor: "pointer"
    }
    const rightArrowStyles = {
        position: 'absolute',
        top:'50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '45px',
        color:'#000',
        zIndex: 1,
        cursor: "pointer"
    }

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

    const dotsContainerStyles = {
        display: 'flex',
        justifyContent: "center"
    }

    const dotStyles = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '20px'

    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return(
        <div style={sliderStyles}>
            <div onClick = {goToPrevious} style={leftArrowStyles}>❰</div>
            <div onClick = {goToNext} style={rightArrowStyles}>❱</div>
            {slides[currentIndex].type === 'jpg' ? (
        <div style = {slideJPGStyles}></div>
      ) : (
        <iframe src={slides[currentIndex].url} width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>
      )}
            
            {/* <div style = {slideStyles}></div> */}
            <div style={dotsContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} style={dotStyles} onClick={() => goToSlide(slideIndex)}>●</div>
                ))}
            </div>
            
        </div>
    )
}

export default ImageSlider;