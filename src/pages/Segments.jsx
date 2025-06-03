/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Text,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
  VStack,
  HStack,
  CardHeader,
  Heading,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Activity,
  Eye,
  EyeOff
} from 'lucide-react';
import StatCard from '../components/Common/StatCard';
import ChartSection from '../components/Segments/ChartSection';
import SegmentTable from '../components/Segments/SegmentTable';

const MotionBox = motion(Box);
const MotionCard = motion(Card);



const Segments = () => {


  // Mock data
  const [segments, setSegments] = useState([
    {
      id: 1,
      name: 'Premium Customers',
      description: 'High-value customers with premium subscriptions',
      criteria: 'Revenue > $1000/month',
      count: 1243,
      revenue: 124300,
      isActive: true,
      createdAt: '2024-01-15',
      lastUpdated: '2024-02-20'
    },
    {
      id: 2,
      name: 'New Signups',
      description: 'Recently acquired customers in last 30 days',
      criteria: 'Signup date < 30 days',
      count: 856,
      revenue: 25680,
      isActive: true,
      createdAt: '2024-02-01',
      lastUpdated: '2024-02-18'
    },
    {
      id: 3,
      name: 'At Risk',
      description: 'Customers showing signs of churn',
      criteria: 'No activity > 14 days',
      count: 432,
      revenue: 43200,
      isActive: false,
      createdAt: '2024-01-20',
      lastUpdated: '2024-02-15'
    },
    {
      id: 4,
      name: 'Enterprise',
      description: 'Large enterprise customers',
      criteria: 'Company size > 1000 employees',
      count: 187,
      revenue: 187000,
      isActive: true,
      createdAt: '2024-01-10',
      lastUpdated: '2024-02-22'
    }
  ]);
 

  // Stats calculations
  const totalSegments = segments.length;
  const activeSegments = segments.filter(s => s.isActive).length;


 
  return (
    <Container maxW="full" p={6}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatCard
              icon={Target}
              label="Total Segments"
              value={totalSegments}
              change={12}
              color="blue.500"
              subtitle="4 segments created"
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatCard
              icon={Activity}
              label="Active Segments"
              value={activeSegments}
              change={8}
              color="green.500"
              subtitle={`${activeSegments}/${totalSegments} active`}
            />
          </MotionBox>
        </SimpleGrid>

        {/* Charts Section */}
        <ChartSection/>

        {/* Segments Table */}
        <SegmentTable segments={segments} setSegments={setSegments} />


      </MotionBox>
    </Container>
  );
};

export default Segments;