import React from 'react'
import FeedPost from './FeedPost'
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

const Feed = () => {
  const {tweets} = useSelector(store=>store.tweet);
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        <FeedPost/>
        {
          tweets?.map(tweet=>{
            return <Tweet key={tweet?.id} tweet={tweet}/>
          })
        }
        <Tweet/>
      </div>
    </div>
  )
}

export default Feed
