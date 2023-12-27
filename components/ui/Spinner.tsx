export function Spinner() {
  return (
    <div
      className='
        flex h-14 w-14 my-12 mx-auto animate-spin justify-center items-center rounded-full border-[3px] border-current border-t-transparent leading-6 text-primary-purple'
      role='status'
      aria-label='loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
