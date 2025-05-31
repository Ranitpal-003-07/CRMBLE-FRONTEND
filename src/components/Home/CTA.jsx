/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
   Box,
   Container,
   Heading,
   Text,
   Button,
   VStack,
   HStack,
   useColorModeValue,
   Icon
} from '@chakra-ui/react';
import { 
   ArrowRight,
   Check
} from 'lucide-react';
import { keyframes } from '@emotion/react';
 
const float = keyframes`
   0%, 100% { transform: translateY(0px); }
   50% { transform: translateY(-20px); }
`;
 
const pulse3D = keyframes`
   0%, 100% { transform: scale(1); }
   50% { transform: scale(1.05); }
`;
 
 
const CTA = () => {
    
return(
    <Box
      py={24}
      bgGradient={useColorModeValue(
        "linear(135deg, blue.500 0%, purple.600 100%)",
        "linear(135deg, purple.800 0%, blue.900 100%)"
      )}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        right="0"
        w="400px"
        h="400px"
        bg="whiteAlpha.100"
        borderRadius="50%"
        transform="translate(50%, -50%)"
        animation={`${float} 8s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="300px"
        h="300px"
        bg="whiteAlpha.50"
        borderRadius="50%"
        transform="translate(-50%, 50%)"
        animation={`${pulse3D} 6s ease-in-out infinite`}
      />
      
      <Container maxW="5xl" textAlign="center" position="relative" zIndex={1}>
        <VStack spacing={8}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}
            color="white"
            fontWeight="black"
            lineHeight="1.1"
          >
            Ready to revolutionize 
            <br />your business?
          </Heading>
          <Text 
            fontSize="2xl" 
            color="whiteAlpha.900" 
            maxW="3xl"
            lineHeight="1.6"
            fontWeight="medium"
          >
            Join thousands of forward-thinking companies already using Crmble to dominate 
            their markets and create exceptional customer experiences.
          </Text>
          
          <HStack spacing={6} flexWrap="wrap" justify="center" pt={4}>
            <Button
              size="xl"
              bg="white"
              color="blue.700"
              fontSize="lg"
              px={10}
              py={6}
              h="auto"
              fontWeight="bold"
              _hover={{ 
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
              }}
              transition="all 0.3s ease"
              rightIcon={<Icon as={ArrowRight} />}
              borderRadius="2xl"
            >
              Start Free Trial
            </Button>
            <Button
              size="xl"
              variant="outline"
              color="white"
              borderColor="white"
              borderWidth="2px"
              fontSize="lg"
              px={10}
              py={6}
              h="auto"
              fontWeight="bold"
              _hover={{ 
                bg: "whiteAlpha.200",
                transform: "translateY(-4px) scale(1.05)"
              }}
              transition="all 0.3s ease"
              borderRadius="2xl"
            >
              Contact Sales
            </Button>
          </HStack>
          
          <HStack spacing={8} pt={6} flexWrap="wrap" justify="center">
            <HStack>
              <Icon as={Check} color="white" />
              <Text color="white" fontSize="lg">No credit card required</Text>
            </HStack>
            <HStack>
              <Icon as={Check} color="white" />
              <Text color="white" fontSize="lg">14-day free trial</Text>
            </HStack>
            <HStack>
              <Icon as={Check} color="white" />
              <Text color="white" fontSize="lg">Cancel anytime</Text>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
);
}

export default CTA;