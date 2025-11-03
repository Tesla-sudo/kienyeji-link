
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TFunction } from '../types';

const data = [
    { name: 'Jan', Sales: 4000 },
    { name: 'Feb', Sales: 3000 },
    { name: 'Mar', Sales: 5000 },
    { name: 'Apr', Sales: 4500 },
    { name: 'May', Sales: 6000 },
    { name: 'Jun', Sales: 5500 },
];

const SalesChart: React.FC<{t: TFunction}> = ({t}) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                        formatter={(value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KSH', minimumFractionDigits: 0 }).format(value)}
                    />
                    <Legend />
                    <Bar dataKey="Sales" fill="#F57C00" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
