import DashboardLayout from "../layouts/DashboardLayout";
import {useEffect, useState} from "react";
import api from "../api/axios";

function Dashboard() {

    const [userSumary, setUserSumary] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true);
        api.get("/dashboard/summary")
            .then(
                res => {
                setUserSumary(res.data);
                setLoading(false);
                localStorage.setItem("username", userSumary.username);
                localStorage.setItem("email", userSumary.email);
            })
            .catch(err => {
                console.error("Failed to load summary", err);
            })
    }, []);


    if (loading) {
        return <div className="text-center text-gray-600">Loading dashboard...</div>;
    }



    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Hi, {userSumary.username}</h2>
            <p className="text-gray-500 mb-6">
                Here is your financial summary for this month.
            </p>



            {userSumary.numberOfAccounts > 0 ?
                (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
                        <p className="text-sm opacity-80">Total Balance</p>
                        <h2 className="text-3xl font-bold mt-2">₹{userSumary.totalBalance.toLocaleString()}</h2>
                        <div className="mt-4 h-16 bg-white/20 rounded-lg"></div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-600 text-sm">Income this Month</p>
                        <h2 className="text-3xl font-bold mt-2">₹{userSumary.incomeThisMonth.toLocaleString()}</h2>
                        <div className="mt-4 h-16 bg-red-100 rounded-lg">
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-600 text-sm">Expense this Month</p>
                        <h2 className="text-3xl font-bold mt-2">₹{userSumary.expenseThisMonth.toLocaleString()}</h2>
                        <div className="mt-4 h-16 bg-yellow-100 rounded-lg">
                        </div>
                    </div>

                </div>) : (
                    <div className="text-center text-gray-600">No accounts found! Create one now</div>

                )
            }



        </DashboardLayout>
    );
}

export default Dashboard;
