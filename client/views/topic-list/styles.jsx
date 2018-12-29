const TopicPrimaryStyle = theme => {
  return {
    root: {
      display: "flex",
      alignItems: "center"
    },
    title: {
      color: "#555"
    },
    tab: {
      backgroundColor: theme.palette.primary[500],
      display: "inline-block",
      textAlign: "center",
      padding: "0 6px",
      color: "#fff",
      borderRadius: 3,
      marginRight: 12,
      fontSize: "12px"
    }
  };
};

const TopicSecondaryStyle = theme => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      paddingTop: 3
    },
    count: {
      textAlign: "center",
      marginRight: 20
    },
    userName: {
      marginRight: 20,
      color: "#123456"
    },
    replyCount: {
        color: theme.palette.accent[300]
    }
  };
};

export { TopicPrimaryStyle, TopicSecondaryStyle };
