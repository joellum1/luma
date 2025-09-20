import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadcrumbsComponent() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
      Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Home
    </Typography>
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}