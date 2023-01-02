import { Box, Button, Icon, Stack } from '@chakra-ui/react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import { BiNote, BiHome, BiTrash, BiBookBookmark } from 'react-icons/bi';

function SideNavigation() {
  const router = useRouter();
  const categories = trpc.category.get.useQuery();
  const id = router?.query?.id;
  const isBoard = router.pathname === '/';
  const isTrash = router.pathname === '/category/trash';
  const isFavorite = router.pathname === '/category/favorite';
  return (
    <Box bg="bg" borderWidth="1px" borderColor="whitesmoke" h="full">
      <Stack
        spacing={2}
        flexWrap="wrap"
        p="20px"
        h="full"
        maxH="500px"
        justifyContent="center"
      >
        <Button
          color={isBoard ? 'primaryText' : 'primaryGrayColor'}
          leftIcon={
            <Icon
              fill={isBoard ? 'primaryText' : 'primaryGrayColor'}
              as={BiHome}
            />
          }
          justifyContent="start"
          alignItems="center"
          onClick={() => router.push('/')}
          variant={isBoard ? 'primary' : 'ghost'}
          textTransform="capitalize"
          borderRadius="5px"
        >
          dashboard
        </Button>
        {(categories.data ?? []).map((el) => {
          const isActive = id === el.id.toLowerCase();
          return (
            <Button
              color={isActive ? 'primaryText' : 'primaryGrayColor'}
              leftIcon={
                <Icon
                  fill={isActive ? 'primaryText' : 'primaryGrayColor'}
                  as={BiNote}
                />
              }
              justifyContent="start"
              alignItems="center"
              onClick={() => router.push(`/category/${el.id}`)}
              key={el.id}
              variant={isActive ? 'primary' : 'ghost'}
              textTransform="capitalize"
              borderRadius="5px"
            >
              {el.name}
            </Button>
          );
        })}
        <Button
          colorScheme="red"
          color={isTrash ? 'white' : 'red.500'}
          leftIcon={<Icon fill={isTrash ? 'white' : 'red.500'} as={BiTrash} />}
          justifyContent="start"
          alignItems="center"
          onClick={() => router.push('/category/trash')}
          variant={isTrash ? 'solid' : 'ghost'}
          textTransform="capitalize"
          borderRadius="5px"
        >
          Trash
        </Button>
        <Button
          colorScheme="orange"
          color={isFavorite ? 'white' : 'orange.500'}
          leftIcon={
            <Icon
              fill={isFavorite ? 'white' : 'orange.500'}
              as={BiBookBookmark}
            />
          }
          justifyContent="start"
          alignItems="center"
          onClick={() => router.push('/category/favorite')}
          variant={isFavorite ? 'solid' : 'ghost'}
          textTransform="capitalize"
          borderRadius="5px"
        >
          Favorite
        </Button>
      </Stack>
    </Box>
  );
}

export default SideNavigation;
