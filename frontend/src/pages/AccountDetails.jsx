import {useState, useEffect} from "react";
import api from "../api/axios";
import {useParams} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import {Pie, Bar, Doughnut
} from 'react-chartjs-2';


function AccountDetails() {

    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(CategoryScale, LinearScale, BarElement);

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

    const income = transactions.filter(
        trans => trans.type === "INCOME"
    ).reduce((acc, trans) => acc + trans.amount, 0);

    const expense = transactions.filter(
        trans => trans.type === "EXPENSE"
    ).reduce((acc, trans) => acc + trans.amount, 0);

    if(showAddTransaction) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    const handleTransactionCreation = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
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

    const processMonthlyData = () => {
        const currentYear = new Date().getFullYear();
        const monthlyData = {};
        
        transactions.forEach(trans => {
            const date = new Date(trans.createdAt);
            if (date.getFullYear() === currentYear) {
                const month = date.toLocaleString('default', { month: 'short' });
                if (!monthlyData[month]) {
                    monthlyData[month] = { income: 0, expense: 0 };
                }
                if (trans.type === 'INCOME') {
                    monthlyData[month].income += trans.amount;
                } else {
                    monthlyData[month].expense += trans.amount;
                }
            }
        });

        const months = Object.keys(monthlyData);
        const incomeData = months.map(month => monthlyData[month].income);
        const expenseData = months.map(month => monthlyData[month].expense);

        return {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    stack: 'Stack 0',
                    backgroundColor: '#4c9f09',
                    borderColor: 'white',
                    borderWidth: 1
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    stack: 'Stack 1',
                    backgroundColor: '#d20000',
                    borderColor: 'white',
                    borderWidth: 1
                }
            ]
        };
    };

const generateColor = (index) => {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#7CD679', '#B58BFF', '#FF8A80', '#82B1FF',
        '#EA80FC', '#80D8FF', '#FFFF8D', '#FF9E80', '#84FFFF'
    ];
    return colors[index % colors.length];
};

const processCategoryData = (transactionType) => {
    const categoryMap = {};
    
    transactions
        .filter(trans => trans.type === transactionType)
        .forEach(trans => {
            const category = trans.category || 'Uncategorized';
            categoryMap[category] = (categoryMap[category] || 0) + trans.amount;
        });

    const categories = Object.keys(categoryMap).sort();
    const amounts = categories.map(cat => categoryMap[cat]);
    const backgroundColors = categories.map((_, index) => generateColor(index));

    return {
        labels: categories,
        datasets: [{
            data: amounts,
            backgroundColor: backgroundColors,
            borderColor: 'white',
            borderWidth: 1
        }]
    };
};

    return (
        <DashboardLayout>
            <h2 className={"text-2xl font-bold mb-4"}>{account.accountName}</h2>
            <p className={"text-gray-500 mb-6"}>
                Balance: ₹{account.balance.toLocaleString()}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-white p-4 rounded-xl shadow h-[250px] flex flex-col">
        <h3 className="text-sm font-semibold mb-2">Overall Income vs Expense</h3>
        <div className="flex-1 flex items-center justify-center">
            <Pie data={{
                labels: ['Income', 'Expense'],
                datasets: [{
                    data: [income, expense],
                    backgroundColor: ['#4c9f09', '#d20000'],
                    hoverOffset: 4,
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }}
            />
        </div>
    </div>

    <div className="bg-white p-4 rounded-xl shadow h-[250px] flex flex-col">
        <h3 className="text-sm font-semibold mb-2">Monthly Trend</h3>
        <div className="flex-1 flex items-center justify-center">
            <Bar 
                data={processMonthlyData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { 
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: { 
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 11
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    </div>

    <div className="bg-white p-4 rounded-xl shadow h-[250px] flex flex-col">
        <h3 className="text-sm font-semibold mb-2">Income by Category</h3>
        <div className="flex-1 flex items-center justify-center">
            <Doughnut 
                data={processCategoryData("INCOME")}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 11
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }}
            />
        </div>
    </div>

    <div className="bg-white p-4 rounded-xl shadow h-[250px] flex flex-col">
        <h3 className="text-sm font-semibold mb-2">Expense by Category</h3>
        <div className="flex-1 flex items-center justify-center">
            <Doughnut 
                data={processCategoryData("EXPENSE")}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 11
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }}
            />
        </div>
    </div>
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
                                <select className="w-full p-2 border rounded-lg"
                                        onChange={(e) => setTransactionType(e.target.value)}>
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