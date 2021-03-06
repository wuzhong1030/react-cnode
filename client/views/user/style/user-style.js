import avatarBg from './bg.jpg';
export default () => {
  return {
    root: {},
    avatar: {
      position: 'relative',
      height: 260,
    },
    avatarImg: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    userName: {
      color: '#fff',
      zIndex: '1',
    },
    bg: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundImage: `url(${avatarBg})`,
      backgroundSize: 'cover',
      '&::after': {
        content: "''",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    },
  };
};
