import { HiArrowCircleDown } from 'react-icons/hi'
import {
  SiFirebase,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

type ProjectCardType = {
  title: string
  imgURL: string
}

export default function ProjectCard({ title, imgURL }: ProjectCardType) {
  return (
    <div className='bg-white border-[1px] rounded-md border-primary-black shadow-[7px_7px_0px_black] max-w-sm mx-auto pb-5'>
      <img
        className='max-w-sm w-full h-[250px] object-cover object-center contrast-75 cursor-pointer'
        src={imgURL}
        alt={`${title}_preview`}
      />
      <div className='p-5'>
        <ul className='w-full flex  gap-3 child:flex child:gap-1 child:py-1 child:px-3  child:items-center child:rounded-md child:bg-primary-black child:text-primary-white'>
          <li>
            <span className='text-sm lg:text-base'>React</span>
            <SiReact className='w-4 h-4 fill-[#00D8FF]' />
          </li>
          <li>
            <span className='text-sm lg:text-base'>Tailwind</span>
            <SiTailwindcss className='w-4 h-4 fill-[#1EA8BC]' />
          </li>
          <li>
            <span className='text-sm lg:text-base'>Firebase</span>
            <SiFirebase className='w-4 h-4 fill-[#F6820C]' />
          </li>
        </ul>
        <h1 className='font-pattaya text-2xl mt-4 text-primary-400'>{title}</h1>
        <p className='max-w-xs w-full text-sm mt-3 text-primary-black/60'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          aspernatur reprehenderit iure neque aliquid porro!
        </p>
        <button className='mt-5 py-2 px-5 text-primary-400 rounded-md shadow-md font-bold'>
          Check Project
        </button>
      </div>
    </div>
  )
}
