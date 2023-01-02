import { Box, Button, Icon, Skeleton, Stack } from '@chakra-ui/react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import { BiHome, BiTrash, BiBookBookmark } from 'react-icons/bi';
import FolderIcon from './FolderIcon';

function SideNavigation() {
  const router = useRouter();
  const folders = trpc.folder.get.useQuery();
  const id = router?.query?.id;
  const isBoard = router.pathname === '/';
  const isTrash = router.pathname === '/folder/trash';
  const isFavorite = router.pathname === '/folder/favorite';
  return (
    <Box bg="bg" borderWidth="1px" borderColor="whitesmoke" h="full">
      <Stack spacing={2} flexWrap="wrap" p="20px" justifyContent="center">
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
        {folders.isLoading &&
          Array.from({ length: 5 }).map((_, i) => <Skeleton h="10" key={i} />)}
        {(folders.data ?? []).map((fld) => {
          const isActive = id === fld.id.toLowerCase();
          return <FolderIcon folder={fld} isActive={isActive} />;
        })}
        <Button
          variant="outline"
          color="primary"
          borderWidth="2px"
          borderColor="primary"
          borderStyle="dashed"
          onClick={() => router.push('/folder/new')}
        >
          Add New Folder
        </Button>
      </Stack>
      <Box h="1px" w="100%" bg="blackAlpha.300" />
      <Stack spacing={2} flexWrap="wrap" p="20px" justifyContent="center">
        <Button
          colorScheme="red"
          color={isTrash ? 'white' : 'red.500'}
          leftIcon={<Icon fill={isTrash ? 'white' : 'red.500'} as={BiTrash} />}
          justifyContent="start"
          alignItems="center"
          onClick={() => router.push('/folder/trash')}
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
          onClick={() => router.push('/folder/favorite')}
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
