import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Explore = () => {
const {ref, inView} = useInView();
const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue)

  // Above all conditional renderings
  useEffect(() => {
    if(inView && !searchValue) fetchNextPage();
  }, [inView, searchValue])
  

  if(!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader/>
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length === 0)

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className='h3-bold md:h2-bold w-full'>Procurar postagens</h2>
        <div className="flex gap-1 pl-4 w-full rounded-lg ">
         <div className="bg-dark-4  w-16 flex items-center rounded-md justify-center">
          <img src="/assets/icons/search.svg" alt="Pesquisar" width={28} height={28} />

         </div>

          <Input
            type='text'
            placeholder='Pesquisar'
            className='explore-search '
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />


        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className='body-bold md:h3-bold'>Populares hoje</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer hover:bg-secondary-500 hover:rounded-full ease-in-out duration-300">
          <p className='small-medium md:base-medium text-light-2'>Todos</p>

          <img src="/assets/icons/filter.svg" alt="Filtro" width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
          isSearchFetching={isSearchFetching}
          searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>Final das postagens</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))}
      </div>
      {hasNextPage && !searchValue && (
        <div className="mt-10" ref={ref}>
          <Loader/>
        </div>
      )}
    </div>
  )
}

export default Explore