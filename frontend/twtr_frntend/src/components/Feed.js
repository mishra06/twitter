import React from 'react'
import FeedPost from './FeedPost'
import Tweet from './Tweet'

const Feed = () => {
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        <FeedPost/>
        <Tweet/>
      </div>
    </div>
  )
}

export default Feed
