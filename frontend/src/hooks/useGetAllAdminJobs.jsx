import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token); // Get token from Redux store

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to Authorization header
                    },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Failed to fetch admin jobs:", error);
            }
        };

        if (token) { // Only fetch jobs if token exists
            fetchAllAdminJobs();
        }
    }, [dispatch, token]); // Add token to the dependency array
};

export default useGetAllAdminJobs;
