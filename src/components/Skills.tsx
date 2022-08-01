import {
  SiFirebase,
  SiGraphql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

export default function Skills() {
  return (
    <section
      id='skills'
      className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full scroll-mt-28'
    >
      <div className='flex flex-col gap-5 max-w-md lg:max-w-lg w-full'>
        <div className='flex items-center mb-10 mx-auto md:mx-0'>
          <div className='flex items-center max-w-[80px] h-[80px] md:max-w-[100px] md:h-[100px] lg:max-w-[115px] lg:h-[115px] w-full bg-secondary-400 rounded-full shadow-lg absolute'></div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl first-letter:tracking-[0.3em] tracking-wider uppercase text-secondary-400 font-bold first-letter:text-primary-white z-10 ml-[3.5rem] md:ml-[4.7rem]'>
            Skills
          </h2>
        </div>
        <div className='lg:child:ml-[4.7rem] text-center md:text-left'>
          <h3 className='uppercase text-3xl'>My Best Skills</h3>
          <p className='text-sm first-letter:text-3xl mt-3 first-letter:text-secondary-400 first-letter:font-medium leading-8 text-primary-gray'>
            These are the most tools I'm Comfortable Using
          </p>
          <ul className='mt-10 flex items-center justify-evenly gap-5 child:flex child:flex-col child:items-center child:gap-4 child:py-3 child:px-5 lg:child:py-5 lg:child:px-10 child:rounded-md flex-wrap md:w-[70vw]'>
            <li className='shadow-md shadow-[#007ACC]/10'>
              <span className='font-light text-lg tracking-wider text-[#007ACC]'>
                TypeScript
              </span>
              <SiTypescript className='w-8 h-8 fill-[#007ACC]' />
            </li>

            <li className='shadow-md shadow-[#00D8FF]/10'>
              <span className='font-light text-lg tracking-wider text-[#00D8FF]'>
                React
              </span>
              <SiReact className='w-8 h-8 fill-[#00D8FF]' />
            </li>

            <li className='shadow-md shadow-[#1EA8BC]/10'>
              <span className='font-light text-lg tracking-wider bg-gradient-to-r from-[#1EA8BC] to-[#12CEB7] bg-clip-text text-transparent'>
                Tailwind
              </span>
              <SiTailwindcss className='w-8 h-8 fill-[#1EA8BC]' />
            </li>

            <li className='shadow-md shadow-[#F6820C]/10'>
              <span className='font-light text-lg tracking-wider bg-gradient-to-r from-[#F6820C] to-[#FCCA3F] bg-clip-text text-transparent'>
                Firebase
              </span>
              <SiFirebase className='w-8 h-8  fill-[#F6820C]' />
            </li>

            <li className='shadow-md shadow-[#E535AB]/10'>
              <span className='font-light text-lg tracking-wider text-[#E535AB] '>
                GraphQl
              </span>
              <SiGraphql className='w-8 h-8 fill-[#E535AB]' />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
