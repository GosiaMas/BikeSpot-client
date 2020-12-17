function HomePage() {
  return (

  <div >
    <div className='homepageflex'> 
    <header>
    <h1>Welcome to BikeSpot</h1>
    <br />
    <h2>An easy service to assure your bike safety</h2>
    <br />
    <h3>BikeSpot is a private bike parking service, that improves your bike journeys by looking after the most essential, your bike!</h3>
    </header>

    <section className="Homepage">
   
    <div class="slider">
      
      <h3>How Does it Work?</h3>
    
          <a href="#slide-1">1</a>
          <a href="#slide-2">2</a>
          <a href="#slide-3">3</a>
          <a href="#slide-4">4</a>
          <a href="#slide-5">5</a>
    
          <div class="slides">
            <div id="slide-1">
                <p> Singup in the App</p>
            </div>
            <div id="slide-2">
              <p>Choose the parking Spots that you want to use</p>
            </div>
            <div id="slide-3">
              <p>Rent them for one hole month for just 15 euros each</p>
            </div>
            <div id="slide-4">
              <p>Get authomatic access to a 24/7 parking survailed service</p>
            </div>
            <div id="slide-5">
              <p>Enjoy!! Easy and Secure!!</p>
            </div>
          </div>
    </div>
    </section>
    </div>
  </div>

  );
}

export default HomePage;
