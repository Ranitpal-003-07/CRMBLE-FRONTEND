import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Heading,
  Text,
  Stat,
  StatHelpText,
  StatArrow,
  Flex,
  Icon,
  VStack,
  HStack,
  Center,
  Button,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Switch,
  Container,
  Spacer,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import {
  TrendingUp,
  Megaphone,
  Users,
  DollarSign,
  Calendar,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Power,
  BarChart3,
  Activity,
  Target,
  Mail
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Stat Card Component
const StatCard = ({ icon, label, value, change, color, subtitle }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const glowColor = useColorModeValue('blue.200', 'blue.300');
  
  return (
    <Card
      bg={cardBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
      shadow="xl"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: `0 20px 40px ${glowColor}40`,
        borderColor: color
      }}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="2px"
        bgGradient={`linear(to-r, ${color}, transparent)`}
      />
      <CardBody>
        <Flex justify="space-between" align="flex-start">
          <VStack align="flex-start" spacing={1}>
            <HStack>
              <Icon as={icon} color={color} boxSize={5} />
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                {label}
              </Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
              {value}
            </Text>
            {subtitle && (
              <Text fontSize="xs" color="gray.400">
                {subtitle}
              </Text>
            )}
            {change && (
              <Stat>
                <StatHelpText>
                  <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
                  {Math.abs(change)}%
                </StatHelpText>
              </Stat>
            )}
          </VStack>
          <Center
            w={12}
            h={12}
            bg={`${color}20`}
            borderRadius="xl"
            border="1px solid"
            borderColor={`${color}30`}
          >
            <Icon as={icon} color={color} boxSize={6} />
          </Center>
        </Flex>
      </CardBody>
    </Card>
  );
};

// Chart Card Component
const ChartCard = ({ title, children, height = "300px" }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const glowColor = useColorModeValue('blue.200', 'blue.300');
  
  return (
    <Card
      bg={cardBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
      shadow="xl"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: `0 15px 30px ${glowColor}30`
      }}
      transition="all 0.3s ease"
    >
      <CardHeader pb={2}>
        <Heading size="md" color={useColorModeValue('gray.700', 'white')}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Box height={height}>
          {children}
        </Box>
      </CardBody>
    </Card>
  );
};

const CampaignsDashboard = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef();
  
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email',
    budget: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    status: 'active'
  });

  // Sample data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Black Friday Sale',
      type: 'email',
      status: 'active',
      budget: 15000,
      spent: 12500,
      revenue: 45000,
      clicks: 2340,
      conversions: 156,
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      targetAudience: 'Premium Customers',
      description: 'Annual Black Friday promotional campaign'
    },
    {
      id: 2,
      name: 'Product Launch',
      type: 'social',
      status: 'active',
      budget: 8000,
      spent: 6200,
      revenue: 28000,
      clicks: 1850,
      conversions: 89,
      startDate: '2024-10-15',
      endDate: '2024-12-15',
      targetAudience: 'Tech Enthusiasts',
      description: 'New product launch awareness campaign'
    },
    {
      id: 3,
      name: 'Holiday Special',
      type: 'paid_ads',
      status: 'paused',
      budget: 12000,
      spent: 8900,
      revenue: 35000,
      clicks: 3200,
      conversions: 198,
      startDate: '2024-12-01',
      endDate: '2024-12-25',
      targetAudience: 'All Customers',
      description: 'Holiday season promotional campaign'
    },
    {
      id: 4,
      name: 'Customer Retention',
      type: 'email',
      status: 'completed',
      budget: 5000,
      spent: 4800,
      revenue: 22000,
      clicks: 1650,
      conversions: 134,
      startDate: '2024-09-01',
      endDate: '2024-10-31',
      targetAudience: 'Existing Customers',
      description: 'Customer retention and loyalty campaign'
    }
  ]);

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', beforeCampaign: 85000, afterCampaign: 95000 },
    { month: 'Feb', beforeCampaign: 88000, afterCampaign: 105000 },
    { month: 'Mar', beforeCampaign: 92000, afterCampaign: 118000 },
    { month: 'Apr', beforeCampaign: 85000, afterCampaign: 125000 },
    { month: 'May', beforeCampaign: 90000, afterCampaign: 135000 },
    { month: 'Jun', beforeCampaign: 87000, afterCampaign: 142000 },
  ];

  // Campaign performance data
  const performanceData = campaigns.map(campaign => ({
    name: campaign.name,
    revenue: campaign.revenue,
    spent: campaign.spent,
    roi: ((campaign.revenue - campaign.spent) / campaign.spent * 100).toFixed(1)
  }));

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const avgROI = ((totalRevenue - totalSpent) / totalSpent * 100).toFixed(1);
    
    return {
      totalCampaigns,
      activeCampaigns,
      totalRevenue,
      avgROI
    };
  }, [campaigns]);

  const handleSubmit = () => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...formData, id: editingCampaign.id }
          : c
      ));
      toast({
        title: "Campaign updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const newCampaign = {
        ...formData,
        id: Math.max(...campaigns.map(c => c.id)) + 1,
        spent: 0,
        revenue: 0,
        clicks: 0,
        conversions: 0
      };
      setCampaigns([...campaigns, newCampaign]);
      toast({
        title: "Campaign created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
    setEditingCampaign(null);
    setFormData({
      name: '',
      description: '',
      type: 'email',
      budget: '',
      startDate: '',
      endDate: '',
      targetAudience: '',
      status: 'active'
    });
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      type: campaign.type,
      budget: campaign.budget.toString(),
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      targetAudience: campaign.targetAudience,
      status: campaign.status
    });
    onOpen();
  };

  const handleDelete = (campaign) => {
    setDeletingCampaign(campaign);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setCampaigns(campaigns.filter(c => c.id !== deletingCampaign.id));
    toast({
      title: "Campaign deleted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
    setDeletingCampaign(null);
  };

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'paused': return 'yellow';
      case 'completed': return 'blue';
      default: return 'gray';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email': return 'purple';
      case 'social': return 'blue';
      case 'paid_ads': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Container maxW="7xl" py={6}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <VStack align="start" spacing={1}>
            <HStack>
              <Icon as={Megaphone} color="blue.500" boxSize={8} />
              <Heading size="xl" color={useColorModeValue('gray.700', 'white')}>
                Campaign Management
              </Heading>
            </HStack>
            <Text color="gray.500">
              Manage and track your marketing campaigns performance
            </Text>
          </VStack>
          <Button
            leftIcon={<Plus />}
            colorScheme="blue"
            onClick={onOpen}
            size="lg"
            shadow="lg"
            _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
            transition="all 0.2s"
          >
            New Campaign
          </Button>
        </Flex>

        {/* Statistics Cards */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
          <StatCard
            icon={Target}
            label="Total Campaigns"
            value={stats.totalCampaigns}
            color="blue.500"
            subtitle="All time"
          />
          <StatCard
            icon={Activity}
            label="Active Campaigns"
            value={stats.activeCampaigns}
            color="green.500"
            subtitle="Currently running"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={15.2}
            color="purple.500"
            subtitle="From campaigns"
          />
          <StatCard
            icon={TrendingUp}
            label="Average ROI"
            value={`${stats.avgROI}%`}
            change={8.4}
            color="orange.500"
            subtitle="Return on investment"
          />
        </Grid>

        {/* Charts Section */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
          {/* Revenue Trend Chart */}
          <ChartCard title="Revenue Impact Analysis" height="400px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E53E3E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E53E3E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="afterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38A169" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38A169" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: useColorModeValue('white', 'gray.800'),
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="beforeCampaign"
                  stroke="#E53E3E"
                  fillOpacity={1}
                  fill="url(#beforeGradient)"
                  name="Before Campaigns"
                />
                <Area
                  type="monotone"
                  dataKey="afterCampaign"
                  stroke="#38A169"
                  fillOpacity={1}
                  fill="url(#afterGradient)"
                  name="After Campaigns"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Campaign Performance Chart */}
          <ChartCard title="Campaign ROI Comparison" height="400px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'ROI']}
                  contentStyle={{
                    backgroundColor: useColorModeValue('white', 'gray.800'),
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="roi" fill="#4299E1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Campaigns Table */}
        <ChartCard title="All Campaigns" height="auto">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Campaign</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Budget</Th>
                  <Th>Spent</Th>
                  <Th>Revenue</Th>
                  <Th>ROI</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {campaigns.map((campaign) => (
                  <Tr key={campaign.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{campaign.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {campaign.targetAudience}
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={getTypeColor(campaign.type)} variant="subtle">
                        {campaign.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(campaign.status)} variant="subtle">
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </Td>
                    <Td>${campaign.budget.toLocaleString()}</Td>
                    <Td>${campaign.spent.toLocaleString()}</Td>
                    <Td>${campaign.revenue.toLocaleString()}</Td>
                    <Td>
                      <Text 
                        color={((campaign.revenue - campaign.spent) / campaign.spent * 100) > 0 ? 'green.500' : 'red.500'}
                        fontWeight="semibold"
                      >
                        {((campaign.revenue - campaign.spent) / campaign.spent * 100).toFixed(1)}%
                      </Text>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <IconButton
                          icon={<Eye />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="View campaign"
                        />
                        <IconButton
                          icon={<Edit3 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() => handleEdit(campaign)}
                          aria-label="Edit campaign"
                        />
                        <IconButton
                          icon={<Power />}
                          size="sm"
                          variant="ghost"
                          colorScheme={campaign.status === 'active' ? 'yellow' : 'green'}
                          onClick={() => toggleCampaignStatus(campaign.id)}
                          aria-label="Toggle campaign status"
                        />
                        <IconButton
                          icon={<Trash2 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDelete(campaign)}
                          aria-label="Delete campaign"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ChartCard>

        {/* Create/Edit Campaign Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalHeader>
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Campaign Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter campaign name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter campaign description"
                  />
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Campaign Type</FormLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="email">Email Marketing</option>
                      <option value="social">Social Media</option>
                      <option value="paid_ads">Paid Advertising</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Budget ($)</FormLabel>
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="0"
                    />
                  </FormControl>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </FormControl>
                </Grid>

                <FormControl>
                  <FormLabel>Target Audience</FormLabel>
                  <Input
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    placeholder="e.g., Premium Customers"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                {editingCampaign ? 'Update' : 'Create'} Campaign
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Campaign
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete "{deletingCampaign?.name}"? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </MotionBox>
    </Container>
  );
};

export default CampaignsDashboard;