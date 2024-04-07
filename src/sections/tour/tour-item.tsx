import { useState } from 'react';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ITourItem } from 'src/types/tour';

// ----------------------------------------------------------------------

type Props = {
  tour: ITourItem;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function TourItem({ tour, onView, onEdit, onDelete }: Props) {
  const popover = usePopover();
  const [starred, SetStarred] = useState(false);
  const {
    id,
    name,
    price,
    images,
    bookers,
    createdAt,
    available,
    tourGuides,
    priceSale,
    destination,
    ratingNumber,
  } = tour;

  const shortLabel = shortDateLabel(available.startDate, available.endDate);

  const renderRating = (
    <Stack
      direction="row"
      onClick={() => {
        SetStarred(!starred);
      }}
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        cursor: 'pointer',
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        bgcolor: 'warning.lighter',
      }}
    >
      <Iconify icon="eva:star-fill" sx={{ color: starred ? 'warning.main' : '#DFE3E8' }} />
    </Stack>
  );

  const renderPrice = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      Bid {fCurrency(price)}
    </Stack>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {renderPrice}
        {renderRating}
        <Image alt={images[0]} src={images[0]} sx={{ borderRadius: 1, height: 164, width: 1 }} />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      onClick={() => onView()}
      sx={{
        cursor: 'pointer',
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`Posted by: ${tourGuides[0].name}`}
      secondary={
        <Link component={RouterLink} href={paths.dashboard.tour.details(id)} color="inherit">
          {name}
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      onClick={() => onView()}
      sx={{
        cursor: 'pointer',

        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton> */}

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          bottom: 20,
          right: 8,
          zIndex: 9,
          borderRadius: 1,
          bgcolor: 'info.lighter',
          position: 'absolute',
          p: '2px 6px 2px 4px',
          color: 'info.darker',
          typography: 'body2',
        }}
      >
        No Reserve
      </Stack>

      {[
        {
          label: shortLabel,
          icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main' }} />,
        },
        {
          label: `${bookers.length} Bids`,
          icon: <Iconify icon="solar:users-group-rounded-bold" sx={{ color: 'primary.main' }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
