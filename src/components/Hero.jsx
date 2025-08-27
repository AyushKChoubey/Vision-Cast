import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate= useNavigate()
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full 
    justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat
    min-h-screen'>

        <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl  2xl:text-7xl
            font-semibold mx-auto leading-[1.2]'>
                Generate content And Grow faster 
                <br/>With<span className='text-primary-100'> AI</span>
            </h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto
            max-sm:text-xs test-grey-600'> 
                Generate images and videos with AI, then schedule and auto-post to Social Media and more on  dashboard.
            </p>
        </div>
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
            <button onClick={()=>navigate('/ai')} className='bg-primary-300 text-white px-10 py-3 rounded-lg
            hover:scale-102 active:scale-95 transition cursor-pointer'>
                Start Creating Now
            </button>
        </div>
        
      
    </div>
  )
}

export default Hero
