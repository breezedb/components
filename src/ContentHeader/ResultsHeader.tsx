import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',

      paddingBottom: spacingFn('xxs'),
      borderBottom: `1px solid ${theme.palette.divider}`,

      '* + &': { marginTop: spacingFn('l') },
      marginBottom: spacingFn('m'),

      [theme.breakpoints.down('sm')]: {
        '* + &': { marginTop: spacingFn('m') },
        marginBottom: spacingFn('xs'),
      },
    },
  })
);

export interface IResultsHeaderProps {
  text: React.ReactNode;
  children?: React.ReactNode;
  headingLevel?: string;
}

export default function ResultsHeader({
  text,
  children,
  headingLevel = 'h2',
}: IResultsHeaderProps) {
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
      {children}
    </header>
  );
}
