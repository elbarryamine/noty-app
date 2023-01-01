import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { FiTrash2, FiBookmark } from 'react-icons/fi';

const NoteCategorieSelect = ({
  categories,
  selected,
  onChange,
}: {
  categories: string[];
  selected: string;
  onChange: (slc: string) => void;
}) => {
  return (
    <Box p='5px' px='10px' bg='secondaryGrayColor' borderRadius='20px'>
      <HStack spacing={2}>
        {categories.map((el) => (
          <Button
            px='30px'
            onClick={() => onChange(el)}
            key={el}
            variant={selected === el ? 'primary' : 'ghost'}
            color={selected !== el ? 'primaryGrayColor' : undefined}
            textTransform='capitalize'
            borderRadius='20px'
          >
            {el}
          </Button>
        ))}
        <Button
          px='30px'
          borderRadius='20px'
          textTransform='capitalize'
          onClick={() => onChange('favorite')}
          bg={selected === 'favorite' ? 'orange.100' : 'transparent'}
          colorScheme='orange'
        >
          <HStack>
            <Icon stroke='orange.400' size='20px' as={FiBookmark} />
            <Text color='orange.400'>Favorite</Text>
          </HStack>
        </Button>
        <Button
          px='30px'
          borderRadius='20px'
          textTransform='capitalize'
          onClick={() => onChange('trash')}
          bg={selected === 'trash' ? 'red.100' : 'transparent'}
          colorScheme='red'
        >
          <HStack>
            <Icon stroke='red.500' size='20px' as={FiTrash2} />
            <Text color='red.500'>Trash</Text>
          </HStack>
        </Button>
      </HStack>
    </Box>
  );
};

export default NoteCategorieSelect;
