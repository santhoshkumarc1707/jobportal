import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-r from-green-400 to-blue-500 text-center py-20'>
            <div className='max-w-6xl mx-auto px-6'>
                <h1 className='text-5xl sm:text-6xl font-extrabold text-white mb-8'>
                    Find Your Dream Job Today
                </h1>
                <p className='text-xl text-white mb-10'>
                    Search, Apply & Get Hired by top companies.
                </p>
                <div className='flex justify-center'>
                    <div className='relative w-full sm:w-[70%] md:w-[60%]'>
                        <div className='flex items-center'>
                            <input
                                type="text"
                                placeholder='Search for jobs, companies or skills'
                                onChange={(e) => setQuery(e.target.value)}
                                className='w-full px-6 py-3 rounded-l-lg border-2 border-gray-300 bg-white text-lg shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#299c21] focus:ring-opacity-50'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="p-7 rounded-r-lg bg-[#38c24f] text-white font-semibold flex items-center hover:bg-[#23861b] transition duration-300 ease-in-out"
                            >
                                <Search className='h-5 w-5' />
                                <span className="ml-2">Search</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
