export const topicDetailStyle = theme => {
  return {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    header: {
      padding: 20,
      borderBottom: '1px solid #dfdfdf',
      '& h3': {
        margin: 0,
      },
    },
    body: {
      padding: 20,
      '& img': {
        maxWidth: '100%',
      },
      '& ul, & ol': {
        paddingLeft: 30,
        '& li': {
          marginBottom: 7,
        },
      },
    },
    replyHeader: {
      padding: '10px 20px',
      backgroundColor: '#eee',
      color: theme.palette.primary[800],
      display: 'flex',
      justifyContent: 'space-between',
    },
    replyBody: {
      padding: 20,
    },
    replies: {
      margin: '0 24px',
      marginBottom: 24,
    },
    notLoginButton: {
      textAlign: 'center',
      padding: '20px 0',
    },
    '@media screen and (max-width: 480px)': {
      replies: {
        margin: '0 10px',
        marginBottom: 24,
      },
      replyEditor: {
        position: 'relative',
        padding: 24,
        borderBottom: '1px solid #dfdfdf',
        '& .CodeMirror': {
          height: 150,
          minHeight: 'auto',
        },
      },
    },
  };
};

export const replyStyle = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: 20,
      paddingBottom: 0,
      borderBottom: '1px solid #dfdfdf',
    },
    left: {
      marginRight: 20,
    },
    loginname: {
      marginRight: 12,
      color: theme.palette.accent[800],
    },
    createAt: {},
    right: {
      '& img': {
        maxWidth: '100%',
        display: 'block',
      },
    },
  };
};
