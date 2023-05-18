export default function Login () {
  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">

            </div>
            <div className="bg-gray-800 flex flex-col justify-center">
                <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                    <h2 className="text-4xl dark:text-white font-bold text-center">SIGN IN</h2>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label>User Name</label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text"/>
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label>Password</label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
                    </div>
                    <div className="flex justify-between text-gray-400 py-2">
                        <p className="flex intems-center"><input className="mr-2" type="checkbox"/> Remember Me</p>
                        <p>Forgot Password</p>
                    </div>
                    <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
  )
}
