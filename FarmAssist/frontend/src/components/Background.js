import React from 'react'
import backgroundVid from '../videos/background.mp4'
const Background = () => {
    return (
        <div>
            <video autoPlay muted loop className="myVideo"
            style={{
                position: "absolute",
                width: "100%",
                objectFit: "cover", 
                transform: "translate(-50%,-50%)",
                zIndex: "-1"
            }}>
                <source src={backgroundVid} type="video/mp4" />
            </video>
        </div>
    )
}
export default Background;