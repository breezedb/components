import React from 'react';

import {
  makeStyles,
  createStyles,
  Grid,
  CardContent,
  Typography,
} from '@material-ui/core';

import SquareCard, { ISquareCardProps } from '../SquareCard';
import EmployerLogos from './EmployerLogos';
import SocialButtons from './SocialButtons';
import Thumbnail from '../Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: theme.spacing(0.5), // Has 12px padding from Grid items
      height: '100%',
      width: '100%',
      margin: 0,
    },
    contentGrid: { height: '100%' },

    overline: {
      color: theme.palette.text.disabled,
      display: 'block',
    },

    name: {
      fontSize: '1.25rem',
      lineHeight: 1.4,
      fontWeight: 'normal',
    },

    socialButtons: { margin: theme.spacing(0, 0, -1.5, -1.75) },

    photoContainer: {
      flexShrink: 1,
      flexBasis: 128 + theme.spacing(3),

      [theme.breakpoints.down('sm')]: { flexBasis: 80 + theme.spacing(3) },
    },
    photo: {
      maxWidth: 128,
      width: '100%',
      height: 128,

      [theme.breakpoints.down('sm')]: {
        maxWidth: 80,
        height: 80,
      },
    },
  })
);

export interface IAntlerProfileCardProps extends ISquareCardProps {
  title: string;
  firstName: string;
  lastName: string;
  profilePhoto?: {
    downloadURL: string;
    name: string;
  }[];
  bio?: string;

  employerLogos?: {
    downloadURL: string;
    name: string;
  }[];
  linkedin?: string;
  twitter?: string;
}

export default function AntlerProfileCard({
  title,
  firstName,
  lastName,
  profilePhoto,

  employerLogos,
  linkedin,
  twitter,

  ...props
}: IAntlerProfileCardProps) {
  const classes = useStyles();

  return (
    <SquareCard {...props}>
      <Grid container spacing={3} wrap="nowrap" className={classes.container}>
        <CardContent component={Grid} item xs>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            className={classes.contentGrid}
          >
            <Grid item xs>
              {title && (
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.overline}
                >
                  {title}
                </Typography>
              )}

              <Typography
                variant="h6"
                component="h3"
                className={classes.name}
                paragraph
              >
                {firstName}
                <br />
                {lastName}
              </Typography>
            </Grid>

            <Grid item>
              {Array.isArray(employerLogos) && employerLogos.length > 0 ? (
                <EmployerLogos employerLogos={employerLogos} />
              ) : (
                <SocialButtons
                  className={classes.socialButtons}
                  linkedin={linkedin}
                  twitter={twitter}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>

        <Grid item className={classes.photoContainer}>
          {profilePhoto?.[0]?.downloadURL && (
            <Thumbnail
              imageUrl={profilePhoto?.[0]?.downloadURL}
              size="400x400"
              shape="square"
              className={classes.photo}
            />
          )}
        </Grid>
      </Grid>
    </SquareCard>
  );
}
