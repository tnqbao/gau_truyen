import React from "react";

const LoadingPage = ({error}) =>
{
    return (
        <div className="flex justify-center items-center px-32 py-52 lg:px-32 lg:py-56 ">
          <h1 className="text-3xl animate-pulse font-bold bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 text-slate-200">
            {error ? error : "ĐANG TẢI..."} 
          </h1>
        </div>
      );
}

export default LoadingPage;