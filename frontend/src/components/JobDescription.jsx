import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
      <Button onClick={() => window.history.back()}>Back</Button>
        <div>
          <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-purple-700 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg transition ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-600"
          } text-white font-medium px-6 py-2`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="border-b-2 border-gray-300 font-medium text-lg pb-4">
        Job Description
      </h2>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          <span className="font-bold">Role:</span>{" "}
          <span className="text-gray-800">{singleJob?.title}</span>
        </p>
        <p>
          <span className="font-bold">Location:</span>{" "}
          <span className="text-gray-800">{singleJob?.location}</span>
        </p>
        <p>
          <span className="font-bold">Description:</span>{" "}
          <span className="text-gray-800">{singleJob?.description}</span>
        </p>
        <p>
          <span className="font-bold">Experience:</span>{" "}
          <span className="text-gray-800">{singleJob?.experience} yrs</span>
        </p>
        <p>
          <span className="font-bold">Salary:</span>{" "}
          <span className="text-gray-800">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <span className="font-bold">Total Applicants:</span>{" "}
          <span className="text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </p>
        <p>
          <span className="font-bold">Posted Date:</span>{" "}
          <span className="text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
