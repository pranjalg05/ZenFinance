import DashBoardLayout from "../layouts/DashboardLayout";
import {useEffect, useState} from "react";
import api from "../api/axios.js";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';

function Stats() {

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const income = transactions.filter(
        t => t.type === "INCOME"
    ).reduce((amt, t) => amt + t.amount, 0);

    const expense = transactions.filter(
        t => t.type === "EXPENSE"
    ).reduce((amt, t) => amt + t.amount, 0);


    useEffect(() => {
            loadTransactions();
        }, []
    )

    const loadTransactions = async () => {
        setLoading(true);
        try {
            const res = await api.get("/transactions/all");
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to load transactions", err);
        } finally {
            setLoading(false);
        }
    }

    const processMonthlyData = () => {
        const currentYear = new Date().getFullYear();
        const monthlyData = {};

        transactions.forEach(trans => {
            const date = new Date(trans.createdAt);
            if (date.getFullYear() === currentYear) {
                const month = date.toLocaleString('default', {month: 'short'});
                if (!monthlyData[month]) {
                    monthlyData[month] = {income: 0, expense: 0};
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


    if (loading) return (
        <DashBoardLayout>
            <p className="text-center text-gray-600">Loading stats...</p>
        </DashBoardLayout>
    )

    return (
        <DashBoardLayout>
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-sm font-semibold mb-2">Total Income</h3>
                    <div className="flex items-center justify-center h-[300px]">
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
                <div className="bg-white p-4 rounded-xl shadow h-[400px] flex flex-col">
                    <h3 className="text-sm font-semibold mb-2">Monthly Trend</h3>
                    <div className="flex-1 flex items-center justify-center ">
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
            </div>
        </DashBoardLayout>
    )
}

export default Stats;