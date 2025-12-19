import { dummyTracks } from '@/lib/dummyTracks'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Trackcard = ({ title, level, rating, hasCertificate, description,projects,duration_hours ,learned_topics,total_topics,providerName,learners_count}) => {
  const progressPercent = (learned_topics / total_topics) * 100;
  return (
    <div className='p-6 space-y-2'>
      <p className='text-xl font-semibold '>{title}</p>
      <p className='text-(--gray-800)'>{projects} Projects <span className='px-4'>{duration_hours} Hours</span></p>
      <p className='line-clamp-2 text-(--gray-800)'>{description}</p>
      <div className="space-y-1">
        <div className="text-sm text-(--gray-700)">
          <span className="font-medium">
            {learned_topics}
          </span>{" "}
          / {total_topics} learned topics
        </div>

        <div className="h-1.5 w-full bg-(--gray-200) rounded-full overflow-hidden">
          <div
            className="h-full bg-(--primary-dark) rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className='flex justify-between items-baseline pt-2'>
        <p>{providerName}</p>
        <p>{learners_count}</p>
      </div>
      
    </div>
  )
}

const Tracks = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) flex-1 w-full">
      <p className='text-4xl font-semibold p-6 border-b border-(--gray-500)'>
        Tracks
      </p>
      <div className='grid md:grid-cols-2 cursor-pointer'>
        {dummyTracks.map((track,index) => (
          <Link href={`/tracks/${track.id}`} key={track.id} className={`
              relative
              border-(--gray-500)
              border-r border-b
              col-2n:no-r
              ${index >= dummyTracks.length - 2 ? 'last-row:border-b' : ''}
              transition block group
              overflow-hidden
              hover:bg-white
            `}>
            <Trackcard title={track.title} level={track.level} hasCertificate={track.hasCertificate} rating={track.rating} projects={track.stats.projects} duration_hours={track.stats.duration_hours} description={track.description} learned_topics={track.stats.learned_topics} total_topics={track.stats.total_topics} providerName={track.provider.name} learners_count={track.stats.learners_count} />
          </Link>
        ))}
      </div>
      <div className='py-12'>

      </div>
    </div>
  )
}

export default Tracks