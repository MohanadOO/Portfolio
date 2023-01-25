function Banner() {
  return (
    <div className='flex flex-col lg:flex-row lg:space-x-5 justify-between px-10 py-5 mb-5'>
      <div>
        <h1 className='text-primary-400 text-lg'>Mohanad Blog</h1>
        <h2 className='text-3xl'>Welcome to my Blog 👋</h2>
      </div>
      <p className='mt-5 text-primary-gray  max-w-sm'>
        Sharing My Journey in Web Development | Interesting Tools and Methods |
        And more...
      </p>
    </div>
  )
}

export default Banner
