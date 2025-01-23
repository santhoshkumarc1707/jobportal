import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="flex items-center justify-between px-6 mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Career<span className="text-[#F83002]">Hub</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#F83002] transition duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#F83002] transition duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#F83002] transition duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#F83002] transition duration-200">
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="text-gray-800 border-gray-400">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white border rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === 'student' && (
                    <div className="flex items-center gap-2">
                      <User2 className="text-gray-500" />
                      <Link to="/profile" className="hover:underline">
                        View Profile
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="text-gray-500" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-red-600 hover:underline"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
