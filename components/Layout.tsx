import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className='min-h-screen py-24 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-4 sm:px-10'>
        {children}
      </div>
      <Footer />
    </>
  )
}
