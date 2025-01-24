import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const token=useSelector((state)=>state.auth.token);
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{
                    headers: {
                        Authorization: `Bearer ${token}` // Add token to Authorization header
                    },
                    withCredentials: true, // Move this outside of the headers block
                });
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch, token])
}

export default useGetCompanyById