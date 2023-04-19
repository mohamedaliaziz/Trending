import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MedaiItem from '../MedaiItem/MedaiItem';
import People from './../People/People';




export default function Home() {
  const [isloding, setisloding] = useState(false);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);
  const [movies, setMovies] = useState([]);
  async function getTrending(x, y) {
    setisloding(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${x}/week?api_key=4695b36575dc31640be632966fff91fa`)
    y(data?.results)
    console.log(data.results);
    setisloding(false)
  }
  useEffect(() => {
    getTrending('movie', setMovies)
    getTrending('tv', setTv)
    getTrending('person', setPeople)

  }, [])

  return (
    <>
    {isloding?<div className='loding position-absolute top-0  end-0 bottom-0 start-0 d-flex justify-content-center align-items-center'>
    <span className="loader d-block"></span>
    </div>:null}

      <div className="row py-3 ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className='brdr w-25 my-3 '></div>
            <h2 className="h4">Trending <br />
              Movies <br />
              Right Now</h2>
            <p className='text-muted'>Top Trending Movies by Week</p>
            <div className='brdr w-100 my-3'></div>
          </div>
        </div>
        {movies.slice(0, 10).map((item, index) => <MedaiItem key={index} itemm={item} />)}
      </div>
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className='brdr w-25 my-3 '></div>
            <h2 className="h4">Trending <br />
              tv <br />
              Right Now</h2>
            <p className='text-muted'>Top Trending tv by Week</p>
            <div className='brdr w-100 my-3'></div>
          </div>
        </div>
        {tv.slice(0, 10).map((item, index) => <MedaiItem key={index} itemm={item} />)}
      </div>
      <div className="row py-3 mb-5">
        <div className="col-md-4 d-flex align-items-center ">
          <div>
            <div className='brdr w-25 my-3 '></div>
            <h2 className="h4">Trending <br />
              People <br />
              Right Now</h2>
            <p className='text-muted'>Top Trending People by Week</p>
            <div className='brdr w-100 my-3'></div>
          </div>
        </div>
        {people.slice(0, 10).map((item, index) => <MedaiItem key={index} itemm={item} />)}
      </div>
    </>
  )
}
