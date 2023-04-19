import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

let {id,medai}=  useParams();
const [details, setDetails] = useState([]);
const [isloding, setisloding] = useState(false);
async function getTrending(id,medai ) {
  setisloding(true)
  let { data } = await axios.get(`https://api.themoviedb.org/3/${medai}/${id}?api_key=4695b36575dc31640be632966fff91fa&language=en-US`)
  setDetails(data)
  console.log(data);
  setisloding(false)
}
useEffect(() => {
  getTrending(id, medai)


}, [])

  return <>
     {isloding?<div className='loding position-absolute top-0  end-0 bottom-0 start-0 d-flex justify-content-center align-items-center'>
    <span className="loader d-block"></span>
    </div>:null}
  
  <div className='row'>
    <div className='col-4'>
    {details?.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+details?.poster_path} className='w-100 card-img-top' alt="" />
:    <img src={'https://image.tmdb.org/t/p/w500'+details?.profile_path} className='w-100' alt="" />
}
    </div>
    <div className='col-md-8 d-flex align-items-center '>
<div>
<h2 className=' card-text'>{details?.title} {details.name}</h2>
    <p className='text-muted'>{details.overview}{details.biography}</p>
    {details.vote_average?<h4>  vote average : {details.vote_average?.toFixed(1)}</h4>:''}
    {details.vote_count?<h4>  vote count : {details.vote_count}</h4>:''}
</div>

    </div>
  </div>
  </>
}
