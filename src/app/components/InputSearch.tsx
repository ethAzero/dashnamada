"use client"
import React, {KeyboardEvent} from "react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export const InputSearch = () => {
  const searchRef =  useRef()
  const router =  useRouter()
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const keyword = searchRef.current.value
      router.push(`/search/${keyword}`)
  }
  };
  return (
    <>
        <div className="container">
          <div className="row justify-center">
            <div className="grid md:grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 place-items-center">
              <input placeholder="Search Block / Block Hash / Transaction" className="rounded w-[500px]" ref={searchRef} onKeyPress={handleSearch}/>
            </div>
          </div>
        </div>
    </>
  )
}