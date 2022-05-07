import { PropTypes } from 'prop-types';
import React, { useMemo } from 'react';
import { Flex } from 'rebass';
import { Image, Text } from 'theme-ui';

function BookCard({ id, title, authors, formats, openBook }) {
  const imageUrl = useMemo(() => {
    const imageEntities = filterByType(formats, 'image/');
    if (imageEntities.length) {
      return imageEntities[0][1];
    }
    return null;
  }, [id]);

  const handleClick = () => {
    let link = getResourceLink(formats);
    openBook(link);
  };
  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      width={114}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}>
      <Image variant="card" src={imageUrl}></Image>
      <Text variant="bookTitle">{title}</Text>
      <Text variant="author">
        {authors.map(({ name }, index) => `${index > 0 ? ' | ' : ''}${name}`)}
      </Text>
    </Flex>
  );
}

const filterByType = (obj, mimeType) => {
  return Object.entries(obj).filter(([key]) => key.startsWith(mimeType));
};

const getResourceLink = (formats) => {
  const htmlLinks = filterByType(formats, 'text/html');
  if (htmlLinks.length > 0) {
    return htmlLinks[0][1];
  }
  const pdfLinks = filterByType(formats, 'text/pdf');
  if (pdfLinks.length > 0) {
    return pdfLinks[0][1];
  }

  const textLinks = filterByType(formats, 'text/plain');
  if (textLinks.length > 0) {
    return textLinks[0][1];
  }
  return null;
};
BookCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  authors: PropTypes.any,
  formats: PropTypes.any,
  openBook: PropTypes.func,
};

export default BookCard;
