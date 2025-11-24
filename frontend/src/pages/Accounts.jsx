import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Accounts() {

    const navigate = useNavigate();

    const [accountName, setAccountName] = useState("");
    const [balance, setBalance] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAddAccount, setShowAddAccount] = useState(false);

    useEffect(() => {
        loadAccounts();
    }, [])

    const loadAccounts = async () => {
        setLoading(true);
        api.get("/accounts/all")
            .then(res => {
                setAccounts(res.data);
            })
            .catch(err => {
                console.error("Failed to load accounts", err);
            }).finally(() => setLoading(false))
    }

    const handleAccountCreation = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await api.post("/accounts/create", {accountName: accountName, balance: balance})
            setShowAddAccount(false)
            loadAccounts();
        } catch (e) {
            console.log(e)
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-center text-gray-600">Loading accounts...</p>
            </DashboardLayout>
        )
    }

    return <DashboardLayout>

        <h2 className="text-2xl font-bold mb-4">Accounts</h2>

        <div className="flex justify-end mb-6">
            <button
                onClick={() => setShowAddAccount(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                + Add Account
            </button>
        </div>

        {accounts.length > 0 ?

            (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {accounts.map(acc => (
                        <div
                            key={acc.accountId}
                            className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                            onClick={() => navigate(`/accounts/${acc.accountId}`)}
                        >
                            <h3 className="text-xl font-bold mt-2">{acc.accountName}</h3>

                            <p className="text-3xl font-semibold mt-4">
                                ₹{acc.balance.toLocaleString()}
                            </p>

                            <p className="text-gray-400 text-sm mt-3">
                                Created on {acc.createdAt}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No accounts found!</p>
            )

        }

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

}

export default Accounts;