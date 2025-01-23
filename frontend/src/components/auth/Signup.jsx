// import  { useEffect, useState } from 'react'

// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Signup = () => {

//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     });
//     const {loading,user} = useSelector(store=>store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();    //formdata object
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': "multipart/form-data" },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             dispatch(setLoading(false));
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[navigate, user])
//     return (
//         <div>
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
//                     <div className='my-2'>
//                         <Label>Full Name</Label>
//                         <Input
//                             type="text"
//                             value={input.fullname}
//                             name="fullname"
//                             onChange={changeEventHandler}
//                             placeholder="patel"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="patel@gmail.com"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Phone Number</Label>
//                         <Input
//                             type="text"
//                             value={input.phoneNumber}
//                             name="phoneNumber"
//                             onChange={changeEventHandler}
//                             placeholder="8080808080"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="patel@gmail.com"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={input.role === 'student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r1">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     checked={input.role === 'recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 onChange={changeFileHandler}
//                                 className="cursor-pointer"
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
//                     }
//                     <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup


import { useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { Office, JobImg } from '@/assets';

const Signup = () => {
    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const submitHandler = async (values) => {
        const formData = new FormData();
        formData.append('fullname', values.fullname);
        formData.append('email', values.email);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('password', values.password);
        formData.append('role', values.role);
        if (values.file) {
            formData.append('file', values.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <div className="flex flex-col  items-center justify-center max-w-7xl mx-auto ">
                <Formik
                    initialValues={{
                        fullname: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        role: 'student',
                        file: null,
                    }}
                    onSubmit={submitHandler}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <div
                            style={{
                                backgroundImage: `url(${values.role === 'student' ? JobImg : Office
                                    })`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '100vh',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Toggle Button */}
                            <div className="absolute top-10 bg-gray-200 rounded-full flex items-center p-1  ">
                                <button
                                    onClick={() =>
                                        handleChange({
                                            target: { name: 'role', value: 'student' },
                                        })
                                    }
                                    className={`px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${values.role === 'student'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    Student
                                </button>
                                <button
                                    onClick={() =>
                                        handleChange({
                                            target: { name: 'role', value: 'recruiter' },
                                        })
                                    }
                                    className={`px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${values.role === 'recruiter'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    Recruiter
                                </button>
                            </div>

                            {/* Form */}
                            <Form
                                className="w-1/2 p-2 m-10 mb-4  rounded-lg shadow-lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)', // Optical white effect
                                    backdropFilter: 'blur(10px)', // Blur for a modern look
                                    border: '1px solid rgba(255, 255, 255, 0.6)', // Light border
                                }}
                            >
                                <h1 className="font-bold text-2xl mb-5 text-center">
                                    Sign Up
                                </h1>
                                <div className="my-4">
                                    <Label>Full Name</Label>
                                    <Field
                                        as={Input}
                                        type="text"
                                        name="fullname"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="my-4">
                                    <Label>Email</Label>
                                    <Field
                                        as={Input}
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="my-4">
                                    <Label>Phone Number</Label>
                                    <Field
                                        as={Input}
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                <div className="my-4">
                                    <Label>Password</Label>
                                    <Field
                                        as={Input}
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="my-4">
                                    <Label>Profile</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setFieldValue('file', e.target.files[0])
                                        }
                                        className="cursor-pointer"
                                    />
                                </div>
                                {loading ? (
                                    <Button className="w-full my-4">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full my-4">
                                        Sign Up
                                    </Button>
                                )}
                                <span className="text-sm text-center block mt-4">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-blue-600">
                                        Login
                                    </Link>
                                </span>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
