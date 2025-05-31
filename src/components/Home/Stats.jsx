/* eslint-disable react-hooks/rules-of-hooks */

import {
  Box,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { 
  TrendingUp, 
  Star,
  Clock,
  Headphones
} from 'lucide-react';

const Stats = () => {

  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const statsBg = useColorModeValue('white', 'gray.800');


    const stats = [
      { 
        number: "400%", 
        label: "Revenue Growth", 
        subtitle: "Average customer increase", 
        icon: TrendingUp,
        trend: "increase"
      },
      { 
        number: "2.5hrs", 
        label: "Time Saved Daily", 
        subtitle: "Per sales representative", 
        icon: Clock 
      },
      { 
        number: "96%", 
        label: "Customer Satisfaction", 
        subtitle: "Industry leading NPS", 
        icon: Star,
        trend: "increase"
      },
      { 
        number: "24/7", 
        label: "Premium Support", 
        subtitle: "White-glove service", 
        icon: Headphones 
      }
    ];

    return (
      <Box py={24} bg={statsBg}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
            {stats.map((stat, index) => (
              <Stat key={index} textAlign="center">
                <Box
                  display="inline-flex"
                  p={4}
                  bg={useColorModeValue('purple.100', 'purple.900')}
                  borderRadius="2xl"
                  mb={4}
                  transform="scale(1)"
                  _hover={{ transform: "scale(1.1)" }}
                  transition="transform 0.3s ease"
                >
                  <Icon as={stat.icon} w={8} h={8} color={useColorModeValue('purple.600', 'purple.300')} />
                </Box>
                <StatNumber 
                  fontSize="5xl" 
                  color={useColorModeValue('purple.600', 'purple.300')} 
                  fontWeight="black"
                  mb={2}
                >
                  {stat.number}
                </StatNumber>
                <StatLabel 
                  fontSize="xl" 
                  color={textColor}
                  fontWeight="bold"
                  mb={1}
                >
                  {stat.label}
                </StatLabel>
                <StatHelpText fontSize="md" color={mutedColor}>
                  {stat.trend && <StatArrow type={stat.trend} />}
                  {stat.subtitle}
                </StatHelpText>
              </Stat>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  };

export default Stats;