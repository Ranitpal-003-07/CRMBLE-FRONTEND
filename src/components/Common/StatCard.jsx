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
  Center
} from '@chakra-ui/react';



const StatCard = ({ icon, label, value, change, color, subtitle }) =>{

    const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
    const glowColor = useColorModeValue('blue.200', 'blue.300');
      
return(
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
}

export default StatCard;