export const createStyle = () => {
  return {
    root: {
      position: 'relative',
      padding: 20,
    },
    title: {
      marginBottom: 20,
    },
    selectItem: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    createBtn: {
      position: 'absolute',
      right: 30,
      bottom: 20,
      opacity: '0.3',
      '&:hover': {
        opacity: '1',
      },
    },
  };
};
