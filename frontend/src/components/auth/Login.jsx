import { useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { Office, JobImg } from '@/assets';

const Login = () => {
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const submitHandler = async (values) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
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
            <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        role: 'student',
                    }}
                    onSubmit={submitHandler}
                >
                    {({ values, handleChange }) => (
                        <div
                            style={{
                                backgroundImage: `url(${
                                    values.role === 'student' ? JobImg : Office
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
                            <div className="absolute top-10 bg-gray-200 rounded-full flex items-center p-1">
                                <button
                                    onClick={() =>
                                        handleChange({
                                            target: { name: 'role', value: 'student' },
                                        })
                                    }
                                    className={`px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${
                                        values.role === 'student'
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
                                    className={`px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${
                                        values.role === 'recruiter'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    Recruiter
                                </button>
                            </div>
                            {/* Form */}
                            <Form
                                className="w-1/4  p-6 my-10 rounded-lg shadow-lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)', // Optical white effect
                                    backdropFilter: 'blur(10px)', // Blur for a modern look
                                    border: '1px solid rgba(255, 255, 255, 0.6)', // Light border
                                }}
                            >
                                <h1 className="font-bold text-2xl mb-5 text-center">
                                    Login
                                </h1>
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
                                    <Label>Password</Label>
                                    <Field
                                        as={Input}
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                {loading ? (
                                    <Button className="w-full my-4">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full my-4">
                                        Login
                                    </Button>
                                )}
                                <span className="text-sm text-center block mt-4">
                                    Don&apos;t have an account?{' '}
                                    <Link to="/signup" className="text-blue-600">
                                        Signup
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

export default Login;
