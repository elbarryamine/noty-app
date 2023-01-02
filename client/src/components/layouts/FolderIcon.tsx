import { Button, Icon } from '@chakra-ui/react';
import { FolderGetResponse } from '@shared/utils/trpc/types';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { BiQuestionMark } from 'react-icons/bi';
import { appIcons } from '@shared/constants/icons';

type Props = {
  folder: FolderGetResponse[number];
  isActive: boolean;
};
const FolderIcon = ({ isActive, folder }: Props) => {
  const router = useRouter();
  const icon = useMemo(
    () => appIcons.find((ic) => ic.name === folder.icon),
    [folder.icon],
  );

  return (
    <Button
      color={isActive ? 'primaryText' : 'primaryGrayColor'}
      leftIcon={
        <Icon
          stroke={isActive ? 'primaryText' : 'primaryGrayColor'}
          as={icon?.icon ?? BiQuestionMark}
        />
      }
      justifyContent="start"
      alignItems="center"
      onClick={() => router.push(`/folder/${folder.id}`)}
      key={folder.id}
      variant={isActive ? 'primary' : 'ghost'}
      textTransform="capitalize"
      borderRadius="5px"
    >
      {folder.name}
    </Button>
  );
};

export default FolderIcon;
