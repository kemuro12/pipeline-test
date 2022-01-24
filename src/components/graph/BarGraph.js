import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraph = ({ data, maxY = 4500, keyX = "_time", keyY = "_value", colorText = "grey", labelX = null, noXAxis = false}) => {
    if(!data) return null;
    let options = {}

    if(noXAxis) options = { ...options, tick: { fontSize: 0 }, tickLine: false }
    else options = { ...options, tick: { fill: colorText, fontSize: 14 }, tickLine: false }

    let low = 0;
    let med = 0;
    
    data.forEach(el => el[keyY] = Number(el[keyY]))
    
    low = maxY / 3;
    med = 2 * low;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} barCategoryGap={0.5} data={data} margin={{
                top: 0,
                right: 10,
                left: -10,
                bottom: 0,
            }}>      
            <XAxis dataKey={keyX} {...options} label={{ fill: colorText, value: labelX, fontSize: 12.5 }} />
            <YAxis tick={{ fill: colorText, fontSize: 14}} domain={[0, maxY]}/>
            <Tooltip />
            <Bar dataKey={keyY} fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry[keyY] < low ? "#FFE699" : entry[keyY] < med ? "#FFC000" : "#F08B1D"} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarGraph