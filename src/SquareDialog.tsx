import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogProps,
  IconButton,
  DialogContent,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

import SlideTransition from './SlideTransition';

export const useDialogStyles = makeStyles(theme =>
  createStyles({
    paper: {
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(2),
        maxWidth: `calc(100% - ${theme.spacing(2 * 2)}px) !important`,
      },
    },
    paperFullScreen: { maxWidth: '100% !important' },

    closeButton: {
      position: 'absolute',
      zIndex: 1,

      top: theme.spacing(3),
      right: theme.spacing(3),

      [theme.breakpoints.down('xs')]: {
        top: theme.spacing(1.5),
        right: theme.spacing(1.5),
      },
    },

    content: {
      padding: theme.spacing(8),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(6),
        maxWidth: 360 + theme.spacing(6 * 2),
      },
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(6, 4, 4) },
    },
  })
);

export interface ISquareDialogProps extends DialogProps {
  overrideClasses?: Partial<ReturnType<typeof useDialogStyles>>;
}

export default function SquareDialog({
  children,
  overrideClasses,
  ...props
}: ISquareDialogProps) {
  const classes = useDialogStyles();

  return (
    <Dialog
      PaperProps={{ square: true, elevation: 0 }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      scroll="body"
      TransitionComponent={Transition}
      {...props}
      classes={{
        ...props.classes,
        paper: clsx(classes.paper, overrideClasses?.paper),
        paperFullScreen: clsx(
          classes.paperFullScreen,
          overrideClasses?.paperFullScreen
        ),
      }}
    >
      <IconButton
        color="secondary"
        onClick={props.onClose as any}
        className={clsx(classes.closeButton, overrideClasses?.closeButton)}
        aria-label="Close"
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <DialogContent
        className={clsx(classes.content, overrideClasses?.content)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <SlideTransition ref={ref} {...props} />;
});