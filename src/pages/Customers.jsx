import React from 'react';
import {
  Box,
  Text,
  Stat,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Flex,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Center,
  Grid,
  GridItem,
  Container,
  Heading,
  SimpleGrid,
  Progress,
  Badge,
  Divider,
  Stack
} from '@chakra-ui/react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  Zap
} from 'lucide-react';
import StatCard from '../components/Common/StatCard';

// Chart Card Component
const ChartCard = ({ title, icon, children, height = "400px" }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  
  return (
    <Card
      bg={cardBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
      shadow="xl"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
      }}
      transition="all 0.3s ease"
      height={height}
    >
      <CardBody>
        <HStack spacing={3} mb={6}>
          <Icon as={icon} color="blue.400" boxSize={6} />
          <Heading size="md" fontWeight="600">
            {title}
          </Heading>
        </HStack>
        {children}
      </CardBody>
    </Card>
  );
};

// Mock Chart Component for User vs Revenue Growth
const UserRevenueChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const userData = [85, 92, 78, 96, 104, 118];
  const revenueData = [45, 52, 48, 61, 67, 74];
  
  return (
    <Box height="300px" position="relative">
      <HStack justify="space-between" mb={6}>
        <HStack spacing={4}>
          <Badge colorScheme="blue" px={3} py={1}>Users</Badge>
          <Badge colorScheme="green" px={3} py={1}>Revenue ($K)</Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500">Last 6 months</Text>
      </HStack>
      
      <Grid templateColumns="repeat(6, 1fr)" gap={4} height="200px" alignItems="end">
        {months.map((month, index) => (
          <GridItem key={month}>
            <VStack spacing={2} height="100%">
              <VStack spacing={1} flex="1" justify="end" width="100%">
                <Box
                  width="20px"
                  height={`${(userData[index] / 120) * 100}%`}
                  bg="blue.400"
                  borderRadius="md"
                  position="relative"
                  _hover={{
                    bg: "blue.500",
                    transform: "scaleY(1.05)"
                  }}
                  transition="all 0.2s"
                />
                <Box
                  width="20px"
                  height={`${(revenueData[index] / 80) * 100}%`}
                  bg="green.400"
                  borderRadius="md"
                  _hover={{
                    bg: "green.500",
                    transform: "scaleY(1.05)"
                  }}
                  transition="all 0.2s"
                />
              </VStack>
              <Text fontSize="xs" color="gray.500" fontWeight="medium">
                {month}
              </Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

// Mock Weekly Activity Chart
const WeeklyActivityChart = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activeUsers = [340, 298, 456, 389, 478, 234, 156];
  const inactiveUsers = [120, 145, 98, 167, 89, 234, 189];
  
  return (
    <Box height="300px">
      <HStack justify="space-between" mb={6}>
        <HStack spacing={4}>
          <HStack>
            <Box w={3} h={3} bg="green.400" borderRadius="full" />
            <Text fontSize="sm">Active Users</Text>
          </HStack>
          <HStack>
            <Box w={3} h={3} bg="red.400" borderRadius="full" />
            <Text fontSize="sm">Inactive Users</Text>
          </HStack>
        </HStack>
        <Text fontSize="sm" color="gray.500">This week</Text>
      </HStack>
      
      <VStack spacing={3} align="stretch">
        {days.map((day, index) => (
          <Box key={day}>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" minW="40px">{day}</Text>
              <HStack spacing={4} fontSize="xs" color="gray.500">
                <Text>{activeUsers[index]} active</Text>
                <Text>{inactiveUsers[index]} inactive</Text>
              </HStack>
            </HStack>
            <HStack spacing={1}>
              <Progress
                value={(activeUsers[index] / (activeUsers[index] + inactiveUsers[index])) * 100}
                size="sm"
                colorScheme="green"
                flex="1"
                borderRadius="full"
                bg="red.100"
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

// Activity Timeline Component
const ActivityTimeline = () => {
  const activities = [
    { time: '2m ago', action: 'New user registered', type: 'success' },
    { time: '5m ago', action: 'User upgraded to premium', type: 'info' },
    { time: '12m ago', action: 'User account deactivated', type: 'warning' },
    { time: '18m ago', action: 'Bulk import completed', type: 'success' },
    { time: '25m ago', action: 'System maintenance', type: 'info' }
  ];
  
  const getTypeColor = (type) => {
    switch(type) {
      case 'success': return 'green.400';
      case 'warning': return 'orange.400';
      case 'info': return 'blue.400';
      default: return 'gray.400';
    }
  };
  
  return (
    <VStack align="stretch" spacing={4}>
      {activities.map((activity, index) => (
        <HStack key={index} spacing={4}>
          <Box
            w={3}
            h={3}
            bg={getTypeColor(activity.type)}
            borderRadius="full"
            flexShrink={0}
            position="relative"
          >
            {index < activities.length - 1 && (
              <Box
                position="absolute"
                left="50%"
                top="100%"
                w="1px"
                h={6}
                bg="gray.200"
                transform="translateX(-50%)"
              />
            )}
          </Box>
          <VStack align="start" spacing={0} flex="1">
            <Text fontSize="sm" fontWeight="medium">
              {activity.action}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {activity.time}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

const Customers = () => {
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.50 0%, purple.50 25%, pink.50 50%, orange.50 75%, yellow.50 100%)',
    'linear(135deg, gray.900 0%, blue.900 25%, purple.900 50%, pink.900 75%, gray.800 100%)'
  );
  
  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        w="200%"
        h="200%"
        opacity={0.1}
        background="radial-gradient(circle, blue.400 1px, transparent 1px)"
        backgroundSize="50px 50px"
        animation="float 20s infinite linear"
        pointerEvents="none"
      />
      
      <Container maxW="7xl" py={8} position="relative" zIndex={1}>
        {/* Header */}
        <VStack spacing={6} mb={8} align="start">
          <HStack spacing={4}>
            <Icon as={Users} color="blue.400" boxSize={8} />
            <VStack align="start" spacing={0}>
              <Heading size="xl" fontWeight="700" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                Customer Analytics
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Real-time insights and user engagement metrics
              </Text>
            </VStack>
          </HStack>
          
          <HStack spacing={2}>
            <Icon as={Activity} color="green.400" boxSize={4} />
            <Text fontSize="sm" color="gray.500">
              Live data • Updated just now
            </Text>
          </HStack>
        </VStack>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          <StatCard
            icon={Users}
            label="Total Users"
            value="12,847"
            change={12.5}
            color="blue.400"
            subtitle="All time registrations"
          />
          <StatCard
            icon={UserCheck}
            label="Active Users"
            value="8,924"
            change={8.3}
            color="green.400"
            subtitle="Last 30 days"
          />
          <StatCard
            icon={UserX}
            label="Inactive Users"
            value="3,923"
            change={-2.1}
            color="red.400"
            subtitle="No activity in 30 days"
          />
        </SimpleGrid>

        {/* Charts Section */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
          <ChartCard title="User vs Revenue Growth" icon={TrendingUp}>
            <UserRevenueChart />
          </ChartCard>
          
          <ChartCard title="Recent Activity" icon={Zap} height="400px">
            <ActivityTimeline />
          </ChartCard>
        </Grid>

        {/* Weekly Activity Chart */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          <ChartCard title="Weekly User Activity" icon={Calendar}>
            <WeeklyActivityChart />
          </ChartCard>
          
          <ChartCard title="Engagement Metrics" icon={BarChart3}>
            <VStack spacing={6} align="stretch">
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">Daily Active Users</Text>
                  <Text fontSize="sm" color="gray.500">73%</Text>
                </HStack>
                <Progress value={73} colorScheme="blue" size="lg" borderRadius="full" />
              </Box>
              
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">User Retention Rate</Text>
                  <Text fontSize="sm" color="gray.500">86%</Text>
                </HStack>
                <Progress value={86} colorScheme="green" size="lg" borderRadius="full" />
              </Box>
              
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">Conversion Rate</Text>
                  <Text fontSize="sm" color="gray.500">34%</Text>
                </HStack>
                <Progress value={34} colorScheme="purple" size="lg" borderRadius="full" />
              </Box>
              
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">Churn Rate</Text>
                  <Text fontSize="sm" color="gray.500">12%</Text>
                </HStack>
                <Progress value={12} colorScheme="red" size="lg" borderRadius="full" />
              </Box>
              
              <Divider />
              
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold">94.2%</Text>
                  <Text fontSize="xs" color="gray.500">Customer Satisfaction</Text>
                </VStack>
                <Icon as={TrendingUp} color="green.400" boxSize={6} />
              </HStack>
            </VStack>
          </ChartCard>
        </Grid>
      </Container>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Customers;