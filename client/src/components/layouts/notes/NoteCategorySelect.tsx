import React from 'react';
import { HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { FiTrash2, FiBookmark } from 'react-icons/fi';
// import { AiOutlinePlus } from 'react-icons/ai';
import { CategoryResponse } from '@shared/utils/trpc/types';
import useBreakpoints from '@shared/hooks/useBreakpoints';

type Props = {
  categories: CategoryResponse;
  selected: number;
  isShowingTrash: boolean;
  isShowingFavorite: boolean;
  onShowTrash: (showing: boolean) => void;
  onShowFavorite: (showing: boolean) => void;
  onChange: (slc: number) => void;
};

const NoteCategorySelect = ({
  categories,
  selected,
  onChange,
  isShowingFavorite,
  isShowingTrash,
  onShowFavorite,
  onShowTrash,
}: Props) => {
  const isSpecialCategorie = isShowingTrash || isShowingFavorite;
  const [, isMd] = useBreakpoints();
  return (
    <HStack spacing={2} flexWrap="wrap" p="5px">
      {/* <Button px='30px' borderRadius='20px' bg='transparent'>
          <HStack>
            <Icon fill='blue.500' size='20px' as={AiOutlinePlus} />
            <Text color='blue.500'>New Categorie</Text>
          </HStack>
        </Button> */}
      {categories.map((el) => (
        <Button
          onClick={() => {
            onShowTrash(false);
            onShowFavorite(false);
            onChange(el.id);
          }}
          px="30px"
          flex={isMd ? '50%' : undefined}
          key={el.id}
          variant={
            selected !== el.id || isSpecialCategorie ? 'ghost' : 'primary'
          }
          color={
            selected !== el.id || isSpecialCategorie
              ? 'primaryGrayColor'
              : undefined
          }
          textTransform="capitalize"
          borderRadius="20px"
        >
          {el.name}
        </Button>
      ))}
      <Button
        flex={isMd ? '50%' : undefined}
        px="30px"
        borderRadius="20px"
        textTransform="capitalize"
        onClick={() => {
          onShowTrash(false);
          onShowFavorite(true);
        }}
        bg={isShowingFavorite ? 'orange.100' : 'transparent'}
        colorScheme="orange"
      >
        <HStack>
          <Icon stroke="orange.400" size="20px" as={FiBookmark} />
          <Text color="orange.400">Favorite</Text>
        </HStack>
      </Button>
      <Button
        flex={isMd ? '50%' : undefined}
        px="30px"
        borderRadius="20px"
        textTransform="capitalize"
        onClick={() => {
          onShowFavorite(false);
          onShowTrash(true);
        }}
        bg={isShowingTrash ? 'red.100' : 'transparent'}
        colorScheme="red"
      >
        <HStack>
          <Icon stroke="red.500" size="20px" as={FiTrash2} />
          <Text color="red.500">Trash</Text>
        </HStack>
      </Button>
    </HStack>
  );
};

export default NoteCategorySelect;
