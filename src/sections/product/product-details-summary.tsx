import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { Dialog, useTheme, TextField, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { IProductItem } from 'src/types/product';
import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();
  const [onClose, SetOnClose] = useState(false);
  const theme = useTheme();

  const {
    id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    newLabel,
    available,
    priceSale,
    saleLabel,
    createdAt,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        colors: [values.colors],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {priceSale && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color as string)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
      {/* {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>} */}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <FormProvider style={{ height: '100%' }} methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3, height: '100%' }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          <Typography variant="h5">{name}</Typography>

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack
          sx={{ position: 'sticky', top: 80 }}
          spacing={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Label color="info">
            <Iconify icon="majesticons:money" color="info" width={18} sx={{ mr: '5px' }} />${price}
          </Label>
          <Label color="info">
            <Iconify icon="tabler:clock-filled" color="info" width={18} sx={{ mr: '5px' }} />
            {fDate(createdAt)}
          </Label>

          <Label color="info">
            <Iconify
              icon="fluent:person-add-24-filled"
              color="info"
              width={18}
              sx={{ mr: '5px' }}
            />
            {totalReviews}
          </Label>
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => {
              SetOnClose(!onClose);
            }}
            sx={{
              cursor: 'pointer',
              borderRadius: 0.8,
              bgcolor: 'grey.800',
              p: '2px 16px 2px 16px',
              color: 'common.white',
              typography: 'caption',
            }}
          >
            Bid
          </Stack>
          <Iconify icon="ph:star" color="info" width={18} sx={{ mr: '5px' }} />
          <Iconify icon="material-symbols:share" color="info" width={18} sx={{ mr: '5px' }} />
        </Stack>
      </Stack>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={onClose}
        onClose={() => SetOnClose(!onClose)}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <Typography variant="h6" sx={{ p: '8px 16px 0px 16px' }}>
          Bid
        </Typography>

        <Stack spacing={1} sx={{ p: '8px 16px' }}>
          <Stack direction="row">
            <Typography variant="h6" textAlign="center" sx={{ p: '16px 0px' }}>
              {name}
            </Typography>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack
            sx={{ position: 'sticky', top: 80 }}
            spacing={2}
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="caption" fontWeight="bold" sx={{ p: '16px 0px' }}>
              Bid
            </Typography>
            <Label color="info">
              <Iconify icon="majesticons:money" color="info" width={18} sx={{ mr: '5px' }} />$
              {price}
            </Label>
            <Label color="info">
              <Iconify icon="tabler:clock-filled" color="info" width={18} sx={{ mr: '5px' }} />
              {fDate(createdAt)}
            </Label>
          </Stack>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Iconify icon="mdi:dollar" width={20} />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body1" fontWeight={400} fontSize={12}>
            Bid $7,550 or more
          </Typography>
          <Button variant="contained">Place Bid</Button>
        </Stack>
      </Dialog>
    </FormProvider>
  );
}
