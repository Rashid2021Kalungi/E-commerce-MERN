import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import imageTobase64 from "../helpers/ImageTobas64";
import summeryApi from "../common";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });
  const navigate=useNavigate()

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summeryApi.signUp.url, {
        method: summeryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi?.success) {
        toast.success(dataApi.message || "Operation successful!");

        navigate("/login")
      } else if (dataApi?.error) {
        toast.error(dataApi.message || "Something went wrong.");
      }

      // console.log("data", dataApi);
    } else {
      toast.error("Password mismatch");
      return;
    }
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePicture: imagePic,
      };
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 pt-12 w-full max-w-md mx-auto rounded ">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden group">
            <img
              src={data.profilePicture || loginIcons}
              alt="login icon"
              className="w-full h-full object-cover"
            />
            <form action="">
              <label className="absolute bottom-0 w-full text-xs text-center font-bold bg-slate-200 bg-opacity-70 py-2 cursor-pointer z-10 group-hover:bg-opacity-90 transition">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            action=""
            className="m-2 p-5 px-1 pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="name">Name: </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="text"
                  name="name"
                  value={data.name || ""}
                  placeholder="Enter your name ...."
                  className="w-full h-full outline-none bg-transparent "
                  onChange={handleOnchange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="email">Email: </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  name="email"
                  value={data.email || ""}
                  placeholder="Enter email address ...."
                  className="w-full h-full outline-none bg-transparent "
                  onChange={handleOnchange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="Password">Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password ...."
                  onChange={handleOnchange}
                  name="password"
                  value={data.password || ""}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="Password"> Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confrim Password ...."
                  onChange={handleOnchange}
                  name="confirmPassword"
                  value={data.confirmPassword || ""}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6  py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>
          <p className="my-2 ">
            Already have account? &nbsp;{" "}
            <Link
              to={"/login"}
              className="text-red-400 hover:text-red-700 hover:underline"
            >
              {" "}
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
