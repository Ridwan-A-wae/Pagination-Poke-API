import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Pagination from './Pagination'

function App() {
  
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8)
  
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = pokemon.slice(firstPostIndex, lastPostIndex)

  const fetchData = async() => {
    const pokemonPromise = [];

    for(let i = 1; i<=100; i++) {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      pokemonPromise.push(res);
    }

    try {
      const results = await Promise.all(pokemonPromise)
      const data = results.map((response) => response.data )
      setPokemon(data)
    }catch (error) {
      console.error(error)
    }
  }
  pokemon.map((poke) => {
    console.log(poke)
  })

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div>
      <div className='headCon'>
      <h1 className='head'>Pokemon Card</h1>
      <p className='created'>Created by Ridwan</p>
      </div>
      {/* Pokemon */}
      <div className='cardCon'>
        {pokemon ? currentPost.map((poke) => (
          //Card
          <div className='card'key={poke.name}> 

          <h1 className='name' >{poke.name} </h1>

          <img className='img' src={poke?.sprites.other.home.front_default} alt={poke.name} />

          </div>
        )) :null}
      </div>
      <Pagination 
      totalPosts = {pokemon.length} 
      postsPerPage = {postPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      />
    </div>
  )
}

export default App
