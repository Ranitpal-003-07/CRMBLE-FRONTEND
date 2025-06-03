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


const MotionBox = motion(Box);
const MotionCard = motion(Card);


const SegmentTable = ({segments,setSegments}) => {
    const toast = useToast();
      const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
      const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
      const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
      const cancelRef = React.useRef();
    
      const [selectedSegment, setSelectedSegment] = useState(null);
      const [formData, setFormData] = useState({
        name: '',
        description: '',
        criteria: '',
        isActive: true
      });
    
    
      
      const handleCreate = () => {
        const newSegment = {
          id: Date.now(),
          ...formData,
          count: Math.floor(Math.random() * 1000) + 100,
          revenue: Math.floor(Math.random() * 100000) + 10000,
          createdAt: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        setSegments([...segments, newSegment]);
        setFormData({ name: '', description: '', criteria: '', isActive: true });
        onCreateClose();
        toast({
          title: 'Segment created',
          description: 'New segment has been created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      };
    
      const handleEdit = () => {
        setSegments(segments.map(s => 
          s.id === selectedSegment.id 
            ? { ...s, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
            : s
        ));
        setSelectedSegment(null);
        setFormData({ name: '', description: '', criteria: '', isActive: true });
        onEditClose();
        toast({
          title: 'Segment updated',
          description: 'Segment has been updated successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      };
    
      const handleDelete = () => {
        setSegments(segments.filter(s => s.id !== selectedSegment.id));
        setSelectedSegment(null);
        onDeleteClose();
        toast({
          title: 'Segment deleted',
          description: 'Segment has been deleted successfully.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      };
    
      const toggleSegmentStatus = (id) => {
        setSegments(segments.map(s => 
          s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
        toast({
          title: 'Status updated',
          description: 'Segment status has been updated.',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      };
    
      const openEditModal = (segment) => {
        setSelectedSegment(segment);
        setFormData({
          name: segment.name,
          description: segment.description,
          criteria: segment.criteria,
          isActive: segment.isActive
        });
        onEditOpen();
      };
    
      const openDeleteModal = (segment) => {
        setSelectedSegment(segment);
        onDeleteOpen();
      };




return(
    <>
     <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
              shadow="xl"
            >
                 <Button
                              leftIcon={<Plus />}
                              colorScheme="blue"
                              onClick={onCreateOpen}
                              shadow="lg"
                              _hover={{
                                transform: 'translateY(-2px)',
                                shadow: 'xl'
                              }}
                            >
                              Create Segment
                            </Button>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="lg">All Segments</Heading>
                  <Text color="gray.500" fontSize="sm">
                    {segments.length} segments total
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Segment Name</Th>
                        <Th>Description</Th>
                        <Th>Criteria</Th>
                        <Th isNumeric>Customers</Th>
                        <Th isNumeric>Revenue</Th>
                        <Th>Status</Th>
                        <Th>Last Updated</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <AnimatePresence>
                        {segments.map((segment, index) => (
                          <motion.tr
                            key={segment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Td>
                              <VStack align="flex-start" spacing={1}>
                                <Text fontWeight="semibold">{segment.name}</Text>
                                <Text fontSize="xs" color="gray.500">
                                  ID: {segment.id}
                                </Text>
                              </VStack>
                            </Td>
                            <Td maxW="200px">
                              <Text fontSize="sm" isTruncated>
                                {segment.description}
                              </Text>
                            </Td>
                            <Td>
                              <Badge colorScheme="blue" variant="subtle">
                                {segment.criteria}
                              </Badge>
                            </Td>
                            <Td isNumeric>
                              <Text fontWeight="semibold">
                                {segment.count.toLocaleString()}
                              </Text>
                            </Td>
                            <Td isNumeric>
                              <Text fontWeight="semibold" color="green.500">
                                ${segment.revenue.toLocaleString()}
                              </Text>
                            </Td>
                            <Td>
                              <HStack>
                                <Badge
                                  colorScheme={segment.isActive ? 'green' : 'red'}
                                  variant="subtle"
                                >
                                  {segment.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  icon={segment.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                                  onClick={() => toggleSegmentStatus(segment.id)}
                                  aria-label="Toggle status"
                                />
                              </HStack>
                            </Td>
                            <Td>
                              <Text fontSize="sm" color="gray.500">
                                {segment.lastUpdated}
                              </Text>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  icon={<MoreVertical size={16} />}
                                  variant="ghost"
                                  size="sm"
                                />
                                <MenuList>
                                  <MenuItem
                                    icon={<Edit size={16} />}
                                    onClick={() => openEditModal(segment)}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    icon={<Trash2 size={16} />}
                                    onClick={() => openDeleteModal(segment)}
                                    color="red.500"
                                  >
                                    Delete
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </MotionCard>
    
            {/* Create/Edit Modal */}
            <Modal isOpen={isCreateOpen || isEditOpen} onClose={isCreateOpen ? onCreateClose : onEditClose} size="xl">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent>
                <ModalHeader>
                  {isCreateOpen ? 'Create New Segment' : 'Edit Segment'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Segment Name</FormLabel>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter segment name"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe this segment"
                        rows={3}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Criteria</FormLabel>
                      <Input
                        value={formData.criteria}
                        onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                        placeholder="e.g., Revenue > $1000/month"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Switch
                        isChecked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        colorScheme="green"
                      />
                      <Text fontSize="sm" color="gray.500" mt={1}>
                        {formData.isActive ? 'Active' : 'Inactive'}
                      </Text>
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={isCreateOpen ? onCreateClose : onEditClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={isCreateOpen ? handleCreate : handleEdit}
                    isDisabled={!formData.name || !formData.description}
                  >
                    {isCreateOpen ? 'Create' : 'Update'}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    
            {/* Delete Confirmation */}
            <AlertDialog
              isOpen={isDeleteOpen}
              leastDestructiveRef={cancelRef}
              onClose={onDeleteClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Segment
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure you want to delete "{selectedSegment?.name}"? This action cannot be undone.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onDeleteClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
    </>
  )
}

export default SegmentTable
