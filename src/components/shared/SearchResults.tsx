import { Models } from 'appwrite'
import React from 'react'
import GridPostList from './GridPostList';
import Loader from './Loader';

type SearchResultsProps ={
  isSearchFetching: boolean,
   searchedPosts: Models.Document[];
}
const SearchResults = ({isSearchFetching, searchedPosts}:SearchResultsProps) => {

if(isSearchFetching) return <Loader/>

if(searchedPosts && searchedPosts.documents.length > 0) return (<GridPostList posts={searchedPosts.documents}/>)

  return (
    <p className='text-light-4 mt-10 w-full text-center '>Nenhum resultado encontrado</p>
  )
}

export default SearchResults