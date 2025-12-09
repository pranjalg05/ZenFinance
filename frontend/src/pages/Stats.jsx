import DashBoardLayout from "../layouts/DashboardLayout";
import {useEffect, useState} from "react";
import api from "../api/axios.js";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale
} from 'chart.js';
import {Pie} from 'react-chartjs-2';
function Stats() {

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

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
            const res = await api.get("/transactions");
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to load transactions", err);
        } finally {
            setLoading(false);
        }
    }


    if (loading) return (
        <DashBoardLayout>
            <p className="text-center text-gray-600">Loading stats...</p>
        </DashBoardLayout>
    )

    return (
        <DashBoardLayout>
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-sm font-semibold mb-2">Total Income</h3>
                    <div className="flex items-center justify-center">
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
            </div>
        </DashBoardLayout>
    )
}

export default Stats;