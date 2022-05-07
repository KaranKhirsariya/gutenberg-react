import GenreCard from 'components/GenreCard/GenreCard';
import React from 'react';
import { Box } from 'rebass';
import { Grid, Text } from 'theme-ui';
import genreDetails from './genreDetails';
import styles from './Genres.module.css';
import { useTranslation } from 'react-i18next';
function Genres() {
  const { t } = useTranslation();
  return (
    <Box bg="secondary">
      <Box className={styles.header}>
        <Box sx={{ maxWidth: '786px' }} m="auto" p={3}>
          <Text as="h1" variant="styles.h1">
            {t('GENRES.TITLE')}
          </Text>
          <Text as="h4" variant="styles.h4">
            {t('GENRES.SUB_TITLE')}
          </Text>
        </Box>
      </Box>
      <Box sx={{ maxWidth: '786px' }} m="auto" p={3}>
        <Grid className={styles.content} gap={3} columns={[1, 2]}>
          {genreDetails.map((data) => (
            <GenreCard key={data.genre} {...data} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Genres;
