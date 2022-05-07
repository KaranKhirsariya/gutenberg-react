import { ReactComponent as ArrowNextIcon } from 'assets/images/Next.svg';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text } from 'theme-ui';

function GenreCard({ genre, Icon, label }) {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books?topic=${genre}`);
  };

  return (
    // <Link to={`/books?genre=${genre}`}>
    <Flex
      role="button"
      onClick={handleClick}
      sx={{
        bg: 'white',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
        height: 50,
        borderRadius: 4,
      }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <Icon width={30} height={30} />
        <Text
          as="span"
          variant="text.body"
          sx={{ fontSize: 2, mx: 2, textTransform: 'uppercase', textDecoration: 'none' }}>
          {label}
        </Text>
      </Flex>
      <ArrowNextIcon size={20} />
    </Flex>
    // </Link>
  );
}

GenreCard.propTypes = {
  /* Genre type searchable string */
  genre: PropTypes.string,

  /* Label to display for the genre */
  label: PropTypes.string,

  /* icon for the genre types */
  Icon: PropTypes.object,
};

export default GenreCard;
