import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  Settings,
  ShoppingBag,
  History,
  Heart,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import RealisticBubbleComponent from "../components/RealisticBubbleComponent";
import { getUserDetails } from "../service/auth.service";
import {
  getProfileImageUrl,
  uploadProfileImage,
} from "../service/profileimage.service";
import LoginPage from "./LoginPage";
import { AxiosError } from "axios";

type UserDto = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  image_url: string;
};

type AdminDto = UserDto & {
  department: string;
};

type CustomerDto = UserDto & {
  address: string;
};

type UserProfile = (AdminDto | CustomerDto) & {
  profileImage?: string;
  joinDate?: string;
  stats?: {
    orders: number;
    wishlist: number;
    reviews: number;
  };
};

const ProfilePage = () => {
  const { isAdmin, isAuthenticated, username, logout } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !username) return;

    setUploading(true);
    setUploadError("");

    try {
      const response = await uploadProfileImage(username, selectedFile);
      // Update the user state with new image URL
      setUser((prev) => ({
        ...prev!,
        profileImage: getProfileImageUrl(response.data),
      }));
    } catch (err) {
      setUploadError("Failed to upload image. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!isAuthenticated || !username) {
          return <LoginPage />;
        }

        const response = await getUserDetails(username);
        const userData = response.data;

        console.log("this is the userdata", userData);

        setUser({
          ...userData,
          profileImage:
            "http://localhost:8080/users/image/" + userData.imageUrl,
          joinDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          stats: {
            orders: 12,
            wishlist: 5,
            reviews: 8,
          },
        });
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load profile",
        );

        if (!isAuthenticated) {
          // instead of returning JSX here, handle redirection with React Router or state
          // navigate("/login") or setShowLogin(true)
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, username, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating bubbles background */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatUp ${Math.random() * 6 + 4}s ease-in-out infinite`,
          }}
        >
          <RealisticBubbleComponent size={Math.random() * 20 + 10} />
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative">
            <button
              className="absolute top-4 right-4 bg-white/90 text-blue-600 p-2 rounded-full shadow-sm hover:bg-white transition-all"
              onClick={() => navigate("/profile/edit")}
            >
              <Pencil size={18} />
            </button>
          </div>

          <div className="px-6 pb-8 relative">
            <div className="flex flex-col items-center -mt-20">
              <div className="relative group">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://www.gravatar.com/avatar/default";
                    console.log("this is the image url", user.image_url);
                  }}
                />
                <div className="absolute bottom-2 right-2 flex flex-col gap-2">
                  <label className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-blue-600 cursor-pointer">
                    <Pencil size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <button
                      onClick={handleImageUpload}
                      disabled={uploading}
                      className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 disabled:bg-green-300"
                    >
                      {uploading ? "Uploading..." : "Save"}
                    </button>
                  )}
                </div>
              </div>
              {uploadError && (
                <div className="mt-2 text-red-500 text-sm text-center">
                  {uploadError}
                </div>
              )}
              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-gray-400 text-sm mt-1">
                Member since {user.joinDate}
              </p>
              <div className="flex gap-6 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {user.stats?.orders || 0}
                  </p>
                  <p className="text-gray-500 text-sm">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {user.stats?.wishlist || 0}
                  </p>
                  <p className="text-gray-500 text-sm">Wishlist</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {user.stats?.reviews || 0}
                  </p>
                  <p className="text-gray-500 text-sm">Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow-md p-6 col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                onClick={() => navigate("/profile/edit/info")}
              >
                <Pencil size={16} /> Edit
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    First Name
                  </label>
                  <p className="mt-1 text-gray-900">{user.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Last Name
                  </label>
                  <p className="mt-1 text-gray-900">{user.lastName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">{user.phoneNumber}</p>
              </div>

              {"address" in user && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="mt-1 text-gray-900">{user.address}</p>
                </div>
              )}

              {"department" in user && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Department
                  </label>
                  <p className="mt-1 text-gray-900">{user.department}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/settings")}
                >
                  <Settings size={20} className="text-blue-500" />
                  <span>Account Settings</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/orders")}
                >
                  <ShoppingBag size={20} className="text-blue-500" />
                  <span>My Orders</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart size={20} className="text-blue-500" />
                  <span>Wishlist</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/order-history")}
                >
                  <History size={20} className="text-blue-500" />
                  <span>Order History</span>
                </button>
                {isAdmin && (
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield size={20} className="text-blue-500" />
                    <span>Admin Dashboard</span>
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Security
              </h2>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh);
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
