import React, { useEffect, useState } from 'react'
import img1 from '../Image/img1.jpg'
import img2 from '../Image/img2.jpg'
import img3 from '../Image/img3.jpg'
import img4 from '../Image/img4.png'
import img5 from '../Image/img5.png'
import './Home.css'

const Slider = () => {
    const [img, setimg] = useState(0);

    const [allImg] = useState([img1, img2, img3, img4, img5])
    useEffect(() => {
        setInterval(()=>{
            setimg(img => img < 5 ? img + 1 : 0)
        },2500)
        
    },[])

    return (
        <>
<img className='imgslide' src={allImg[img]} alt="Error!!"/>
        </>
    )
}

export default Slider