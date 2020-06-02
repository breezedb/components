import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  CardMedia,
} from '@material-ui/core';
import AntlerLogo from '../assets/antler-logo.svg';

const useStyles = makeStyles(theme =>
  createStyles({
    content: { flexGrow: 1 },

    overline: { color: theme.palette.text.disabled },

    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,
      backgroundSize: 'contain',
      backgroundPosition: 'center left',

      margin: theme.spacing(2, 0),
      display: 'block',
    },

    oneLine: { minHeight: `${1.45 * 4}em` },
  })
);

export interface IStartupCardContentsProps {
  companyName: string;
  sector: string[];
  logo?: { downloadURL: string }[];
  oneLineDescription: string;
  oneLine?: string;
}

export default function StartupCardContents({
  companyName,
  sector,
  logo,
  oneLineDescription,
  oneLine,
}: IStartupCardContentsProps) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="overline" className={classes.overline}>
        {sector?.join(' · ')}
      </Typography>

      {logo?.[0]?.downloadURL && (
        <CardMedia
          image={logo[0].downloadURL.replace('ANTLER', AntlerLogo)}
          className={classes.logo}
        />
      )}

      <Typography
        variant="h6"
        component="h3"
        color="textSecondary"
        gutterBottom
      >
        {companyName}
      </Typography>

      <Typography variant="body2" className={classes.oneLine}>
        {oneLineDescription ?? oneLine}
      </Typography>
    </>
  );
}
