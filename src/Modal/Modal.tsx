import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogProps,
  DialogTitle,
  Typography,
  IconButton,
  Grid,
  Button,
  ButtonProps,
} from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';
import CloseIcon from '@material-ui/icons/Close';

import { SlideTransitionMui } from './SlideTransition';
import ScrollableDialogContent from './ScrollableDialogContent';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-modal': spacingFn('s') + 'px',
      '--spacing-modal-contents': spacingFn('s') + 'px',
      '--spacing-card': 'var(--spacing-modal-contents)',

      [theme.breakpoints.down('sm')]: {
        '--spacing-modal': spacingFn('xs') + 'px',
      },
    },

    paper: {
      overflowX: 'hidden',

      padding: 'var(--spacing-modal)',
      paddingBottom: 'var(--spacing-modal-contents)',
    },

    titleRow: {
      padding: 0,
      paddingBottom: 'var(--spacing-modal)',

      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.typography.h5,
      [theme.breakpoints.down('sm')]: theme.typography.h6,
    },
    closeButton: {
      margin: theme.spacing(-1.5),
      marginLeft: 'var(--spacing-modal)',
    },

    content: {
      padding: '0 var(--spacing-modal)',
      margin: '0 calc(var(--spacing-modal) * -1)',

      ...theme.typography.body1,

      '&:last-child': {
        marginBottom: 'calc(var(--spacing-modal-contents) * -1)',
        paddingBottom: 'var(--spacing-modal-contents)',
      },

      '& > * + *': { marginTop: 'var(--spacing-modal-contents)' },
    },
    contentDividers: {
      margin: '0 calc(var(--spacing-modal) * -1)',
    },

    actions: {
      paddingTop: 'var(--spacing-modal-contents)',
      '& button': { minWidth: 100 },
    },
  })
);

export interface IModalProps extends Partial<Omit<DialogProps, 'title'>> {
  onClose: () => void;

  title: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;

  children?: React.ReactNode;
  body?: React.ReactNode;

  actions?: {
    primary?: Partial<ButtonProps>;
    secondary?: Partial<ButtonProps>;
  };

  hideCloseButton?: boolean;
}

export default function Modal({
  onClose,
  title,
  header,
  footer,
  children,
  body,
  actions,
  hideCloseButton,
  ...props
}: IModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideTransitionMui}
      onClose={handleClose}
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="modal-title"
      {...props}
      classes={{
        ...props.classes,
        root: clsx(classes.root, props.classes?.root),
        paper: clsx(classes.paper, props.classes?.paper),
      }}
    >
      <DialogTitle
        id="modal-title"
        className={classes.titleRow}
        disableTypography
      >
        <Typography
          className={classes.title}
          component="h2"
          color="textPrimary"
        >
          {title}
        </Typography>

        {!hideCloseButton && (
          <IconButton
            onClick={handleClose}
            className={classes.closeButton}
            aria-label="Close"
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      {header}

      <ScrollableDialogContent
        className={classes.content}
        dividersClasses={{ root: classes.contentDividers }}
        disableBottomDivider={!footer && !actions}
      >
        {children || body}
      </ScrollableDialogContent>

      {footer}

      {actions && (
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.actions}
        >
          {actions.secondary && (
            <Grid item>
              <Button {...actions.secondary} />
            </Grid>
          )}

          {actions.primary && (
            <Grid item>
              <Button variant="contained" {...actions.primary} />
            </Grid>
          )}
        </Grid>
      )}
    </Dialog>
  );
}
