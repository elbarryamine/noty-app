import React from 'react';
import {
  Text,
  Stack,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useRouter } from 'next/router';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';
import BaseContainer from '@components/containers/BaseContainer';
import NoMatchesFound from '@components/elements/NoMatchesFound';
import NotesSkeleton from '@components/layouts/NotesSkeleton';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useQueryClient } from '@tanstack/react-query';

function Folder() {
  const query = useQueryClient();
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? router.query?.id?.trim?.() : '';
  const folder = trpc.folder.getById.useQuery({ id });
  const folderDelete = trpc.folder.delete.useMutation({
    onMutate: () => router.push('/'),
    onSuccess: () => query.invalidateQueries(trpc.folder.get.getQueryKey()),
  });
  return (
    <BaseContainer>
      <Stack spacing={5}>
        <HStack>
          <Text variant="subheader">{folder.data?.name}</Text>
          <Menu>
            <MenuButton>
              <Icon as={BsThreeDotsVertical} />
            </MenuButton>
            <MenuList>
              <MenuItem
                color="red.500"
                onClick={() =>
                  folderDelete.mutate({ id: folder.data?.id ?? '' })
                }
              >
                Delete Folder
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        {folder.data?.notes.length === 0 && <NoMatchesFound />}
        {folder.isError && <div>{folder.failureReason?.message}</div>}
        <NotesContainer>
          {folder.isLoading && <NotesSkeleton />}
          {folder.data?.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </NotesContainer>
      </Stack>
    </BaseContainer>
  );
}

export default Folder;
