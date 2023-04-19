import React from 'react'
import { Link } from 'react-router-dom';

export default function MedaiItem({itemm}) {




  return <>
  
  
  <div className='col-md-2'>
<div className='position-relative card bg-transparent'>
<Link className='card-body text-center text-decoration-none text-white' to={`/movieDetails/${itemm?.id}/${itemm?.media_type}`} >
{itemm?.poster_path?    <img src={'https://image.tmdb.org/t/p/w500'+itemm?.poster_path} className='w-100 card-img-top' alt="" />
:    <img src={'https://image.tmdb.org/t/p/w500'+itemm?.profile_path} className='w-100' alt="" />
}
    <h3 className='h6 card-text'>{itemm?.title} {itemm.name}</h3>
    {itemm?.vote_average?<div className='vote top-0 end-0 position-absolute '>{ itemm?.vote_average?.toFixed(1)}</div>
:null}

</Link>
</div>
  </div>
  
  
  
  
  </>
}
