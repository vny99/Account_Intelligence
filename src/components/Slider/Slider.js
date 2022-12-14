import React, {useState} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import BusinessChallengesService from '../../services/business-challenge.service'

export default function Slider() {

   const [slides,setSlides]=useState([])
   const [slideIndex, setSlideIndex] = useState(1)

    const styleObj = {
        fontSize: 30,
        
        textAlign: "center",
        fontFamily:  "Arial, Helvetica, sans-serif",
       
    }

    const nextSlide = () => {
        if(slideIndex !== slides.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === slides.length){
            setSlideIndex(1)
        }
    }
    
    const prevSlide = () => {
        setTimeout(()=>{
            if(slideIndex !== 1){
                setSlideIndex(slideIndex -1)
            }
            else if (slideIndex === 1){
                setSlideIndex(slides.length)
            }
        },200);
    }
    
    const moveDot = index => {
        setSlideIndex(index)
    }

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    }

    BusinessChallengesService.getBusinessChallenges().then((res) => {
        setSlides(res.data);
    })
    
    const delay = 4000;
    const timeoutRef = React.useRef(null);

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
            setSlideIndex((prevIndex) =>
                prevIndex === slides.length  ? 1 : prevIndex + 1
            ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [slideIndex]);
 
    return (
        <div className="container-slider"  >
            {  
               (slides.map(
                    (challenge, index) => {
                        return (
                            <React.Fragment >
                                <div className={ slideIndex === index+1 ? "slide active-anim" : "slide"}>
                                    <a href={'/viewChallenge/' + challenge.id} className='slider-text'>
                                       <p className='challenge-title' style={styleObj} > {challenge.challengeTitle || ""}</p>
                                       <p className='challenge-description'>{challenge.challengeDescription.slice(0,400) + "..."}</p>
                                       <div className="expiry-date">Expiry Date: {new Date(challenge.expiryDate).toDateString().slice(4, 11) + "," + new Date(challenge.expiryDate).toDateString().slice(11)}</div>
                                    </a>   
                                </div>
                            </React.Fragment>
                        )
                    }
                )
           
            )}
           
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide}direction={"prev"}  />
                
            <div className="container-dots">
                {Array.from({length: slides.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>  

        </div>

    )

       
}
   
    
                    

                
