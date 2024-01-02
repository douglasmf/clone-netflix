import React, {useEffect, useState} from 'react'
import './App.sass'
import Tmdb from './Tmdb'
import Header from './components/Header/Header.jsx'
import MovieRow from './components/MovieRow/MovieRow.jsx'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie.jsx'

export default () => {

  const [movieList, setMovieList] = useState([]) 
  const [featuredData, setFeaturedData] = useState(null) // filme/serie destaque
  const [blackHeader,setBlackHeader] = useState(false) 

  useEffect(()=>{ 
    const loadAll = async () => {
          // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList() // esperando o resultado
      setMovieList(list) // setMovieList recebe a lista

          // Pegando o Featured (destaque)
      let originals = list.filter(i=>i.slug === 'originals') //originals recebe a lista de originais netflix
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1)) // é sorteado um número de 0 até a quantidade de itens da lista
      let chosen = originals[0].items.results[randomChosen] // chosen recebe o item correspondente ao número sorteado
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv') 
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(()=>{
    const scrollListner = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      }else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListner)

    return () => {
      window.removeEventListener('scroll', scrollListner)
    }
  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader}/>
      
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito por Douglas Monteiro<br/>
        Baseado no video de <a href='https://www.youtube.com/watch?v=tBweoUiMsDg&t=6202s'>Bonieky Lacerda</a>
        <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>
      <div className='loading'>
        <img src="" alt="caregando"/>
      </div>
    </div>
  )
}