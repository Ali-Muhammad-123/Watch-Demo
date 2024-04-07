import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import PostCommentForm from 'src/sections/blog/post-comment-form';
import PostCommentList from 'src/sections/blog/post-comment-list';

import { IPostComment } from 'src/types/blog';
import { IProductItem } from 'src/types/product';

import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ProductDetailsView({ id }: Props) {
  // const { product, productLoading, productError } = useGetProduct(id);
  const productError = { message: '123' };
  const productLoading = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const product: IProductItem = {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-04-06T14:23:15.020Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-04-05T13:23:15.020Z',
        comment: 'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-04-04T12:23:15.020Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-04-03T11:23:15.020Z',
        comment: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-04-02T10:23:15.020Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-04-01T09:23:15.020Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-03-31T08:23:15.020Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-03-30T07:23:15.020Z',
        comment: 'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE271',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: true,
      content: 'No Reserve',
    },
    sku: 'WW75K5211YW/SV',
    createdAt: '2024-04-05T13:23:15.021Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Foundations Matte Flip Flop',
    price: 97.14,
    coverUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
    totalRatings: 3.7,
    totalSold: 684,
    totalReviews: 9124,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#000000', '#FFFFFF'],
  };
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const [publish, setPublish] = useState('');

  // useEffect(() => {
  //   if (product) {
  //     setPublish(product?.publish);
  //   }
  // }, [product]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.product.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );
  const comments: IPostComment[] = [
    {
      id: '8fe89de7-9c6b-4fdc-a795-09512e7d8742',
      name: 'Jayvion Simon',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
      message: 'She eagerly opened the gift, her eyes sparkling with excitement.',
      postedAt: '2024-04-06T18:22:20.703Z',
      users: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          name: 'Lucian Obrien',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          name: 'Deja Brady',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        },
      ],
      replyComment: [
        {
          id: '1823dde1-8f1b-4900-8355-a0d260e116b7',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          message:
            'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
          postedAt: '2024-04-05T17:22:20.703Z',
        },
        {
          id: '676d1bee-08ea-4c4d-a638-b780a5317ff4',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
          tagUser: 'Lucian Obrien',
          postedAt: '2024-04-04T16:22:20.703Z',
        },
        {
          id: '0016b33c-3e50-4387-bfae-08bd4f08d254',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          message:
            'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
          postedAt: '2024-04-03T15:22:20.703Z',
        },
      ],
    },
    {
      id: 'b683ac81-52e4-4197-8480-0832cda4c7a7',
      name: 'Reece Chung',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
      message:
        'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
      postedAt: '2024-04-02T14:22:20.703Z',
      users: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          name: 'Lainey Davidson',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
          name: 'Cristopher Cardenas',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          name: 'Melanie Noble',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        },
      ],
      replyComment: [
        {
          id: '17841965-056b-4d0a-9a02-7c413a6d03e8',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          message:
            'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
          postedAt: '2024-04-01T13:22:20.703Z',
        },
        {
          id: 'c616c29a-6c1b-47a1-b8b1-70a3aefff835',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
          message: 'The waves crashed against the shore, creating a soothing symphony of sound.',
          postedAt: '2024-03-31T12:22:20.703Z',
        },
        {
          id: '1766ee1b-b4a5-4dd5-acf2-204f3fc25503',
          userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          message:
            'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
          postedAt: '2024-03-30T11:22:20.703Z',
        },
      ],
    },
    {
      id: 'c1b45ceb-4820-4c79-a5fe-353159b2ea8e',
      name: 'Chase Day',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg',
      message:
        'She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.',
      postedAt: '2024-03-29T10:22:20.703Z',
      users: [],
      replyComment: [],
    },
    {
      id: '47f073ee-9818-4cd9-a3b7-f241c148ad78',
      name: 'Shawn Manning',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg',
      message:
        'The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.',
      postedAt: '2024-03-28T09:22:20.703Z',
      users: [],
      replyComment: [],
    },
  ];
  const renderProduct = product && (
    <>
      <Grid container sx={{ mt: 1 }} spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary disabledActions product={product} />
        </Grid>
      </Grid>

      <Card sx={{ my: 10 }}>
        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}
      </Card>

      <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
        <Typography variant="h4">Comments</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          ({comments.length})
        </Typography>
      </Stack>

      <PostCommentForm />

      <Divider sx={{ mt: 5, mb: 2 }} />

      <PostCommentList comments={comments} />
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* {productLoading && renderSkeleton} */}

      {/* {productError && renderError} */}
      <CustomBreadcrumbs
        heading="Auctions"
        links={[
          {
            name: 'Auctions',
            href: '/dashboard',
          },
          { name: product.name },
        ]}
      />
      {product && renderProduct}
    </Container>
  );
}
