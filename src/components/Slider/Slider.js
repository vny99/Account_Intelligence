import React, {useState} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'

export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    const slides = ["Business Challenge 1", "Business Challenge 2", "Business Challenge 3",
    "Business Challenge 4", "Business Challenge 5"];

    return (
        <div className="container-slider">
            {
                slides.map(
                    (obj, index) => {
                        return (
                            <React.Fragment key={obj.id}>
                                {/* <div key={obj.id} className='bgimage'></div> */}
                                <div className={ slideIndex === index+1 ? "slide active-anim" : "slide"}>
                                    <a key={obj.id} href='/bc' className='slider-text'>
                                        {obj}
                                        <p>Description</p>
                                    </a>
                                    
                                </div>
                            </React.Fragment>
                        )
                    }
                )
            }
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}
