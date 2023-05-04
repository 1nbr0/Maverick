import { Button } from 'flowbite-react'
import React from 'react'

const Home = () => {
  return (
    <div className='container mx-auto px-4'>
      <section className='section-home-view'>
        <div>
          <h1>Home View | Bonjour User 🫡</h1>
        </div>
      </section>
      <section className='section-my-plane'>
        <div className='header-warplanes'>
          <div>
            <h2>Mes avions</h2>
          </div>
          <Button 
            outline={true}
            gradientDuoTone="cyanToBlue"
            className='radius-inherit'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouvel avion
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home