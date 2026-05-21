import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-md flex justify-between items-center h-16 px-8'>
      <div className="w-[10%]">
        <h1 className='font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          My App
        </h1>
      </div>
      <div className="w-[50%]">
        <ul className='w-full h-full flex gap-8 list-none items-center justify-center font-medium'>
          <li className='cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-105'>Home</li>
          <li className='cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-105'>About</li>
          <li className='cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-105'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar