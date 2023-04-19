import axios from 'axios';
import { array } from 'joi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Tvshow() {
  let media_type = 'tv'
  let nums = new Array(10).fill(1).map((elem , index)=> index+1);
  console.log(nums);
  const [Tvshow, setTvshow] = useState([]);
  const [isloding, setisloding] = useState(false);
  async function getTrending(page) {
    setisloding(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=4695b36575dc31640be632966fff91fa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    setTvshow(data?.results)
    console.log(data.results);
    setisloding(false)
  }
  useEffect(() => {
    getTrending(1)


  }, [])
  return <>
     {isloding?<div className='loding position-absolute top-0  end-0 bottom-0 start-0 d-flex justify-content-center align-items-center'>
    <span className="loader d-block"></span>
    </div>:null}
  <div className='row mb-5'>
    {Tvshow.map((item, index)=>  <div key={index} className='col-md-3'>
<div className='position-relative card bg-transparent'>
<Link className='card-body text-center text-decoration-none text-white' to={`/movieDetails/${item?.id}/${media_type}`} >
    <img src={'https://image.tmdb.org/t/p/w500'+item?.poster_path} className='w-100 card-img-top' alt="" />


    <h3 className='h6 card-text'>{item?.name} </h3>
    <div className='vote top-0 end-0 position-absolute '>{ item?.vote_average?.toFixed(1)}</div>


</Link>
</div>
  </div>)}

  <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center ">

    {nums.map((page)=><li onClick={()=>{
      getTrending(page)
    }} key={page} className="page-item"><Link className="page-link" >{page}</Link></li>
)}


  </ul>
</nav>
  </div>
  
  
  </>
}
