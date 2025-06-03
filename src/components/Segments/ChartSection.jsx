import {
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ChartCard from '../Common/ChartCard'


const MotionBox = motion(Box);

const ChartSection = () => {

    
  const revenueData = [
    { month: 'Jan', Premium: 120000, NewSignups: 20000, AtRisk: 45000, Enterprise: 180000 },
    { month: 'Feb', Premium: 124300, NewSignups: 25680, AtRisk: 43200, Enterprise: 187000 },
    { month: 'Mar', Premium: 128000, NewSignups: 28000, AtRisk: 41000, Enterprise: 192000 },
    { month: 'Apr', Premium: 132000, NewSignups: 31000, AtRisk: 39000, Enterprise: 198000 },
    { month: 'May', Premium: 135000, NewSignups: 33500, AtRisk: 37500, Enterprise: 205000 },
    { month: 'Jun', Premium: 138500, NewSignups: 36000, AtRisk: 36000, Enterprise: 210000 }
  ];

    const segmentDistribution = [
    { name: 'Premium Customers', value: 1243, color: '#8884D8' },
    { name: 'New Signups', value: 856, color: '#82CA9D' },
    { name: 'At Risk', value: 432, color: '#FFC658' },
    { name: 'Enterprise', value: 187, color: '#FF7C7C' }
  ];




return(
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
                <ChartCard title="Revenue Trend by Segments" height="400px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="Premium" stroke="#8884D8" strokeWidth={3} />
                      <Line type="monotone" dataKey="Enterprise" stroke="#FF7C7C" strokeWidth={3} />
                      <Line type="monotone" dataKey="NewSignups" stroke="#82CA9D" strokeWidth={3} />
                      <Line type="monotone" dataKey="AtRisk" stroke="#FFC658" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ChartCard title="Segment Distribution" height="400px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={segmentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {segmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), 'Customers']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </MotionBox>
            </SimpleGrid>
  )
}

export default ChartSection
