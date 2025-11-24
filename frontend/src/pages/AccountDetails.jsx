import {useState, useEffect} from "react";
import api from "../api/axios";
import {useParams} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";


function AccountDetails() {

    const {id} = useParams();

    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    const [transactions, setTransaction] = useState([]);
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [transactionCategory, setTransactionCategory] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionError, setTransactionError] = useState("");
    const [transactionType, setTransactionType] = useState("INCOME");

    const handleTransactionCreation = async (e) => {
        e.preventDefault();
        if(isSubmitting) return;
        setTransactionError("");
        setIsSubmitting(true);

        if (transactionAmount <= 0) {
            setTransactionError("Amount must be greater than 0");
            setIsSubmitting(false);
            return;
        }

        if (transactionType === "EXPENSE" && transactionAmount > account.balance) {
            setTransactionError("Insufficient balance");
            setIsSubmitting(false);
            return;
        }

        try {
            await api.post(`/transactions/create`, {
                accountId: id,
                category: transactionCategory,
                amount: transactionAmount,
                type: transactionType
            })
            setShowAddTransaction(false);
            setTransactionAmount(0)
            setTransactionCategory("")
            loadtransactions();
        } catch (e) {
            setTransactionError("Failed to create transaction");
        } finally {
            setIsSubmitting(false);
        }
    }

    const loadtransactions = async () => {
        setLoading(true);
        try {
            const accRes = await api.get(`/accounts/${id}`);
            setAccount(accRes.data);

            const res = await api.get(`/transactions/${id}`);
            setTransaction(res.data);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadtransactions()
    }, [id])

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-center text-gray-600">Loading account details...</p>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <h2 className={"text-2xl font-bold mb-4"}>{account.accountName}</h2>
            <p className={"text-gray-500 mb-6"}>
                Balance: ₹{account.balance.toLocaleString()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow">Income vs Expense Chart Here</div>
                <div className="bg-white p-6 rounded-xl shadow">Monthly Trend Chart Here</div>
            </div>

            <div className={"flex justify-between items-center mb-6"}>
                <h3 className="text-xl font-bold mb-4">Transactions</h3>
                <button className={"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"}
                        onClick={() => setShowAddTransaction(true)}>
                    + Transaction
                </button>
            </div>

            {showAddTransaction && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                        <h2 className="text-xl font-bold mb-4">Add New Account</h2>

                        <form
                            onSubmit={handleTransactionCreation}
                            className="space-y-4"
                        >

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Transaction Type
                                </label>
                                <select className="w-full p-2 border rounded-lg" onChange={(e) => setTransactionType(e.target.value)}>
                                    <option value="INCOME">Income</option>
                                    <option value="EXPENSE">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Transaction Category
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={transactionCategory}
                                    onChange={(e) => setTransactionCategory(e.target.value)}
                                />
                            </div>



                            {transactionError && (
                                <p className="text-red-500 text-sm text-center">{transactionError}</p>
                            )}

                            <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
                                Add Transaction
                            </button>
                        </form>

                        <button
                            className="bg-red-600  mt-4 w-full text-white hover:bg-red-700 py-2 rounded-lg"
                            onClick={() => setShowAddTransaction(false)}
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}

            {transactions.length === 0 ?
                (<p className="text-center text-gray-600">No transactions found!</p>) :
                (
                    <div className={"bg-white p-4 rounded-xl shadow divide-y divide-gray-200 mb-6"}>
                        {transactions.map(trans => (
                            <div key={trans.id} className="py-3 flex justify-between">
                                <div>
                                    <p className="font-medium">{trans.category}</p>
                                    <p className="text-sm text-gray-500">{trans.createdAt}</p>
                                </div>
                                <p
                                    className={`font-semibold ${
                                        trans.type === "INCOME" ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {trans.type === "INCOME" ? "+" : "-"}₹{trans.amount}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
        </DashboardLayout>
    )
}

export default AccountDetails;