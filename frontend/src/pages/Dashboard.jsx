import DashboardLayout from "../layouts/DashboardLayout";
import {useEffect, useState} from "react";
import api from "../api/axios";

function Dashboard() {

    const [showAddAccount, setShowAddAccount] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [balance, setBalance] = useState(0)
    const [userSumary, setUserSumary] = useState([])
    const [loading, setLoading] = useState(true)

    const loadSummary = () => {
        setLoading(true);
        api.get("/dashboard/summary")
            .then(res => {
                setUserSumary(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load summary", err);
            })
    }

    useEffect(() => {
        loadSummary();
    }, []);


    if (loading) {
        return <div className="text-center text-gray-600">Loading dashboard...</div>;
    }

    const handleAccountCreation = async (e) => {
        e.preventDefault();
        try {
            await api.post("/accounts/create", {accountName: accountName, balance: balance})
            setShowAddAccount(false)
            loadSummary();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Hi, {userSumary.username}</h2>
            <p className="text-gray-500 mb-6">
                Here is your financial summary for this month.
            </p>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setShowAddAccount(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Add Account
                </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">Total Balance</p>
                    <h2 className="text-3xl font-bold mt-2">₹{userSumary.totalBalance}</h2>
                    <div className="mt-4 h-16 bg-white/20 rounded-lg"></div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-600 text-sm">Income this Month</p>
                    <h2 className="text-3xl font-bold mt-2">₹{userSumary.incomeThisMonth}</h2>
                    <div className="mt-4 h-16 bg-red-100 rounded-lg">
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-600 text-sm">Expense this Month</p>
                    <h2 className="text-3xl font-bold mt-2">₹{userSumary.expenseThisMonth}</h2>
                    <div className="mt-4 h-16 bg-yellow-100 rounded-lg">
                    </div>
                </div>

            </div>
            {showAddAccount && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                        <h2 className="text-xl font-bold mb-4">Add New Account</h2>

                        <form
                            onSubmit={handleAccountCreation}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Initial Balance
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
                                Save Account
                            </button>
                        </form>

                        <button
                            className="bg-red-600  mt-4 w-full text-white hover:bg-red-700 py-2 rounded-lg"
                            onClick={() => setShowAddAccount(false)}
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}

export default Dashboard;
