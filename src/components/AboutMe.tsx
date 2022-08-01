import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'

export default function AboutMe() {
  return (
    <section
      id='about-me'
      className='flex flex-col gap-10 lg:gap-20 my-12 scroll-mt-28'
    >
      <div className='flex items-center mb-10 mx-auto md:mx-0'>
        <div className='flex items-center max-w-[80px] h-[80px] md:max-w-[100px] md:h-[100px] lg:max-w-[115px] lg:h-[115px] w-full bg-primary-400 rounded-md shadow-lg absolute'></div>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold first-letter:text-primary-white text-primary-400 z-10 ml-[3.5rem] md:ml-[5rem] uppercase'>
          About
        </h2>
      </div>

      <hr className='border-primary-black/40' />

      <div className='flex flex-col-reverse md:flex-row items-center md:items-start gap-10'>
        <div>
          <img
            className='aspect-[1/1] max-w-[15rem] xl:max-w-sm 3xl:max-w-md rounded-md object-cover object-center'
            src='/images/MyPicture.png'
            alt='Mohanad Alrwaihy Picture'
          />
        </div>
        <div className='flex flex-col gap-5 items-center md:items-start'>
          <h3 className='font-bold py-2 px-5 bg-primary-black text-primary-white rounded-md shadow-lg lg:text-lg xl:text-xl '>
            Electronics Engineer Graduate ⚡ | Web Developer Self Taught
          </h3>
          <p className='text-sm md:text-base xl:text-lg 2xl:text-xl font-light first-letter:text-3xl md:first-letter:text-4xl lg:first-letter:text-5xl xl:first-letter:text-6xl 2xl:first-letter:text-7xl first-letter:text-primary-black first-letter:font-bold text-center md:text-left leading-7 2xl:max-w-2xl text-primary-black'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </p>
          <ul className='flex items-center gap-4'>
            <li>
              <AiFillGithub className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <AiOutlineTwitter className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <AiFillLinkedin className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <BsWhatsapp className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
          </ul>
        </div>
      </div>

      <hr className='border-primary-black/40' />
    </section>
  )
}
