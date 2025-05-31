import {
  Box,
  Container,
  Grid,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Users,
  UserCheck,
  UserX,
  Target,
  Circle,
  Activity,
  DollarSign,
} from 'lucide-react';
import {
  Pie,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import StatCard from '../components/Common/StatCard';
import ChartCard from '../components/Common/ChartCard';


const MainDashboard = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, blue.50, purple.50)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );


  const revenueData = [
    { month: 'Jan', revenue: 45000, users: 1200 },
    { month: 'Feb', revenue: 52000, users: 1350 },
    { month: 'Mar', revenue: 48000, users: 1280 },
    { month: 'Apr', revenue: 61000, users: 1420 },
    { month: 'May', revenue: 55000, users: 1380 },
    { month: 'Jun', revenue: 67000, users: 1520 }
  ];

  const campaignData = [
    { name: 'Email Marketing', value: 35, color: '#4299E1' },
    { name: 'Social Media', value: 28, color: '#9F7AEA' },
    { name: 'Search Ads', value: 22, color: '#38B2AC' },
    { name: 'Display Ads', value: 15, color: '#ED8936' }
  ];

  const userSegmentData = [
    { name: 'Premium', users: 850, fill: '#4299E1' },
    { name: 'Standard', users: 1200, fill: '#9F7AEA' },
    { name: 'Free', users: 2100, fill: '#38B2AC' }
  ];

  const activityData = [
    { day: 'Mon', active: 2800, inactive: 1200 },
    { day: 'Tue', active: 3200, inactive: 800 },
    { day: 'Wed', active: 2900, inactive: 1100 },
    { day: 'Thu', active: 3500, inactive: 500 },
    { day: 'Fri', active: 3800, inactive: 200 },
    { day: 'Sat', active: 2200, inactive: 1800 },
    { day: 'Sun', active: 2600, inactive: 1400 }
  ];


  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}
    >
      <Container maxW="7xl" py={8} position="relative">

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <StatCard
            icon={Users}
            label="Total Users"
            value="4,150"
            change={12.5}
            color="blue.400"
            subtitle="All registered users"
          />
          <StatCard
            icon={UserCheck}
            label="Active Users"
            value="3,280"
            change={8.2}
            color="green.400"
            subtitle="Last 30 days"
          />
          <StatCard
            icon={UserX}
            label="Inactive Users"
            value="870"
            change={-3.1}
            color="orange.400"
            subtitle="Dormant accounts"
          />
          <StatCard
            icon={Target}
            label="Campaigns"
            value="24"
            change={15.8}
            color="purple.400"
            subtitle="Active campaigns"
          />
        </SimpleGrid>

        {/* Secondary Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <StatCard
            icon={Circle}
            label="User Segments"
            value="8"
            color="teal.400"
            subtitle="Targeting groups"
          />
          <StatCard
            icon={DollarSign}
            label="Monthly Revenue"
            value="$67,000"
            change={18.4}
            color="green.400"
            subtitle="Current month"
          />
          <StatCard
            icon={Activity}
            label="Conversion Rate"
            value="3.24%"
            change={5.2}
            color="blue.400"
            subtitle="Campaign average"
          />
        </SimpleGrid>

        {/* Charts Grid */}
        <Grid
          templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
          gap={6}
          mb={8}
        >
          <ChartCard title="Revenue & User Growth" height="400px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4299E1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4299E1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                    border: '1px solid #4299E1',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4299E1"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#9F7AEA"
                  fillOpacity={1}
                  fill="url(#userGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Campaign Performance" height="400px">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={campaignData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {campaignData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                    border: '1px solid #4299E1',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={6}
        >
          <ChartCard title="User Activity Trends">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                    border: '1px solid #4299E1',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="active" fill="#4299E1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inactive" fill="#9F7AEA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="User Segments Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={userSegmentData}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="users"
                />
                <Legend
                  iconSize={10}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                    border: '1px solid #4299E1',
                    borderRadius: '8px'
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainDashboard;