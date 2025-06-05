import React from 'react'

const NewsLetter = () => {
    
        return (
            <div id='offers' className="flex flex-col items-center justify-center text-center space-y-2 text-white mt-20 pb-14">
                <h1 className="md:text-4xl text-2xl font-semibold">Get Books at your Fingertips!</h1>
                <p className="md:text-lg text-gray-500/70 pb-8">
                    We will share with you the must reads, classical, and other suggestions
                </p>
                <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                    <input
                        className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                        type="text"
                        placeholder="Enter your email id"
                        required
                    />
                    <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-white/10 hover:border-primary hover:text-primary hover:scale-105 transition-all cursor-pointer rounded-md rounded-l-none">
                        Bismillah!
                    </button>
                </form>
            </div>
        )
    
}

export default NewsLetter