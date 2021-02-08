import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-end',

      '* + &': { marginTop: theme.spacing('l') },
      marginBottom: theme.spacing('m'),

      [theme.breakpoints.down('xs')]: {
        '* + &': { marginTop: theme.spacing('m') },
        marginBottom: theme.spacing('xs'),
      },

      '&::before': {
        content: '""',
        display: 'block',

        backgroundColor: theme.palette.divider,

        flexShrink: 0,
        height: 1,
        width: 88,
        marginRight: theme.spacing('m'),

        [theme.breakpoints.down('xs')]: {
          width: 82,
          marginRight: theme.spacing('xs'),
        },
      },
    },
  })
);

export interface ISubSectionHeaderProps {
  text: React.ReactNode;
  headingLevel?: string;
}

export default function SubSectionHeader({
  text,
  headingLevel = 'h3',
}: ISubSectionHeaderProps) {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Typography
        variant="overline"
        component={headingLevel as any}
        color="textSecondary"
      >
        {text}
      </Typography>
    </header>
  );
}