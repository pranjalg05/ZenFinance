import {useNavigate} from "react-router-dom";
import {Home, CreditCard, BarChart3, Settings} from 'lucide-react'

function DashboardLayout({children}) {

    const navigate = useNavigate();

    const menu = [
        {icon: <Home size={22}/>, path: "/"},
        {icon: <CreditCard size={22}/>, path: "/accounts"},
        {icon: <BarChart3 size={22}/>, path: "/stats"},
        {icon: <Settings size={22}/>, path: "/settings"},
    ]

    return (

        <div className="min-h-screen flex bg-[#f5f7fb]">


            <aside className="w-20 bg-white p-4 flex flex-col items-center shadow-md">
                <div
                    className="mb-6 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
                    ZF
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    {menu.map((m, i) => (
                        <button onClick={() => navigate(m.path)}
                                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-blue-100 text-gray-700">
                            {m.icon}
                        </button>
                    ))}
                </div>
            </aside>

            <div className="flex-1">
                <header className="flex justify-end items-center bg-white shadow-sm px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                </header>

                <main className="p-6">{children}</main>

            </div>
        </div>
    )

}

export default DashboardLayout;
