
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-[#30ba2b]">Latest & Top</span> Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                {allJobs.length <= 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No Job Available. Please check back later!
                    </div>
                ) : (
                    allJobs?.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
