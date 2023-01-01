import React, { useState } from 'react';
import HeaderNavigation from '@components/layouts/HeaderNavigation';
import dynamic from 'next/dynamic';
import { Box, Container, Flex, Stack } from '@chakra-ui/layout';
import NoteCategorySelect from '../notes/NoteCategorySelect';
import {
  CategoryNotesList,
  FavoriteNotesList,
  TrashNotesList,
} from '../notes/NotesList';
import { trpc } from '@shared/utils/trpc/trpc';
import { SlideFade, Spinner, useDisclosure } from '@chakra-ui/react';
import useBreakpoints from '@shared/hooks/useBreakpoints';

const NewNote = dynamic(() => import('../notes/NewNotePopup'));

const HomePage = () => {
  const [, isMd] = useBreakpoints();
  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: true,
  });
  const [isShowingTrash, setShowTrash] = useState(false);
  const [isShowingFavorite, setShowFavorite] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const category = trpc.category.get.useQuery(undefined, {
    onSuccess: (data) => {
      setSelected(data?.[0]?.id ?? null);
    },
  });

  const handleCloseBeforeAction = (fn: () => void) => {
    onClose();
    const timer = setTimeout(() => {
      fn();
      onOpen();
      clearTimeout(timer);
    }, 400);
  };

  return (
    <Box as="main" h="100vh">
      <Container maxW="container.lg" px="10px" h="100%">
        <Stack spacing={10} h="100%">
          <HeaderNavigation />
          <Flex
            justify="space-between"
            align="center"
            flexDir={isMd ? 'column' : 'row'}
            flexWrap="wrap"
            zIndex={2}
          >
            {category.isLoading ? (
              <Spinner />
            ) : (
              <>
                {selected && (
                  <NoteCategorySelect
                    isShowingTrash={isShowingTrash}
                    isShowingFavorite={isShowingFavorite}
                    onShowTrash={(showing) =>
                      handleCloseBeforeAction(() => setShowTrash(showing))
                    }
                    onShowFavorite={(showing) =>
                      handleCloseBeforeAction(() => setShowFavorite(showing))
                    }
                    categories={category.data ?? []}
                    selected={selected}
                    onChange={(value) =>
                      handleCloseBeforeAction(() => setSelected(value))
                    }
                  />
                )}
              </>
            )}
            {selected && !isShowingTrash && !isShowingFavorite && (
              <SlideFade delay={0.1} offsetY="-60px" in={isOpen}>
                <NewNote categoryId={selected} />
              </SlideFade>
            )}
          </Flex>
          {selected && !isShowingTrash && !isShowingFavorite && (
            <SlideFade delay={0.1} offsetY="-60px" in={isOpen}>
              <CategoryNotesList categoryId={selected} />
            </SlideFade>
          )}
          {isShowingTrash && (
            <SlideFade delay={0.1} offsetY="-60px" in={isOpen}>
              <TrashNotesList />
            </SlideFade>
          )}
          {isShowingFavorite && (
            <SlideFade delay={0.1} offsetY="-60px" in={isOpen}>
              <FavoriteNotesList />
            </SlideFade>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
