import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';


const categories = [
    {
        name: "Frontend Developer",
        description: "Build and design stunning user interfaces.",
        icon: "🌐",
    },
    {
        name: "Backend Developer",
        description: "Create robust server-side applications.",
        icon: "⚙️",
    },
    {
        name: "Data Science",
        description: "Analyze data and unlock insights.",
        icon: "📊",
    },
    {
        name: "Graphic Designer",
        description: "Design visually captivating graphics.",
        icon: "🎨",
    },
    {
        name: "full stack devloper",
        description: "Master both frontend and backend development.",
        icon: "💻",
    },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
        window.location.reload(); // Forces a reload after navigation
    };
    
    return (
        <div className="max-w-5xl mx-auto my-20 px-4">
            <h2 className="text-center text-3xl font-bold mb-8">
                Explore Job Categories
            </h2>
            <Carousel className="w-full">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="flex justify-center items-center px-10 "
                        >
                            <div className="group bg-white shadow-lg rounded-lg p-10  text-center transform hover:scale-105 hover:shadow-xl transition duration-300">
                                <div className="text-5xl mb-4">{cat.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                                <p className="text-gray-600 mb-4">{cat.description}</p>
                                <Button
                                    onClick={() => searchJobHandler(cat.name)}
                                    variant="primary"
                                    className="rounded-full px-6 py-2 group-hover:bg-blue-600 group-hover:text-white"
                                >
                                    Explore
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md cursor-pointer" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md cursor-pointer" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
