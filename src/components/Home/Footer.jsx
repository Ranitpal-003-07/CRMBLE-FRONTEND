import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';



const Footer = () => {


return(
    <Box bg={useColorModeValue('gray.900', 'black')} color="white" py={16}>
      <Container maxW="7xl">
        <VStack spacing={8}>
          <HStack spacing={6}>
            <Heading size="xl" color="white" fontWeight="black">
              Crmble
            </Heading>
            <Badge 
              colorScheme="purple" 
              fontSize="md" 
              px={3} 
              py={1}
              borderRadius="full"
            >
              Next-Gen CRM
            </Badge>
          </HStack>
          
          <Divider borderColor="gray.700" />
          
          <HStack spacing={8} flexWrap="wrap" justify="center">
            <Text color="gray.400" fontSize="lg">© 2025 Crmble. All rights reserved.</Text>
            <Text color="gray.600">|</Text>
            <Text 
              color="gray.400" 
              cursor="pointer" 
              _hover={{ color: "white" }}
              fontSize="lg"
              transition="color 0.2s ease"
            >
              Privacy Policy
            </Text>
            <Text color="gray.600">|</Text>
            <Text 
              color="gray.400" 
              cursor="pointer" 
              _hover={{ color: "white" }}
              fontSize="lg"
              transition="color 0.2s ease"
            >
              Terms of Service
            </Text>
            <Text color="gray.600">|</Text>
            <Text 
              color="gray.400" 
              cursor="pointer" 
              _hover={{ color: "white" }}
              fontSize="lg"
              transition="color 0.2s ease"
            >
              Contact
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Footer;