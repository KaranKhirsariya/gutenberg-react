// eslint-disable all
import { fetchBooks } from 'api/api';
import { ReactComponent as BackIcon } from 'assets/images/Back.svg';
import { ReactComponent as SearchIcon } from 'assets/images/Search.svg';
import BookCard from 'components/BookCard/BookCard';
import Modal from 'components/Modal';
import TextBox from 'components/TextBox/TextBox';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flex } from 'rebass';
import { Box, Grid, Spinner, Text } from 'theme-ui';

function Books() {
  const [showBookUnavailablePopup, setShowBookUnavailablePopup] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const searchBooks = ({ pageParam = '1' }) =>
    fetchBooks({ search: searchText, page: pageParam, topic: searchParams.get('topic') });

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery(['books', searchText, searchParams.get('topic')], searchBooks, {
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return;
        const nextUrl = new URL(lastPage.next);
        if (nextUrl) {
          const nextPage = nextUrl.searchParams.get('page');
          return nextPage;
        }
      },
    });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleOpenBook = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      setShowBookUnavailablePopup(true);
    }
  };
  const renderBooks = () => {
    return status === 'loading' ? (
      <Spinner color="primary" floodColor="muted" size={32} />
    ) : status === 'error' ? (
      <p>Error: {error.message}</p>
    ) : (
      <>
        <Grid
          gap={3}
          sx={{
            m: 1,
            justifyItems: 'center',
            gridTemplateColumns: 'repeat(auto-fill, minmax(114px, 1fr))',
          }}>
          {data.pages.map((books, i) => (
            <React.Fragment key={i}>
              {books.results.map((book) => (
                <BookCard {...book} key={book.id} openBook={handleOpenBook} />
              ))}
            </React.Fragment>
          ))}
        </Grid>
        <div
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? (
            <Spinner color="secondary" floodColor="muted" size={32} />
          ) : hasNextPage ? (
            'Load More'
          ) : null}
        </div>
        <div>
          {isFetching && !isFetchingNextPage ? (
            <Spinner color="secondary" floodColor="muted" size={32} />
          ) : null}
        </div>
      </>
    );
  };
  return (
    <>
      <Box bg="secondary">
        <Box bg="white">
          <Box sx={{ maxWidth: '786px' }} m="auto" p={3}>
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              role="button"
              onClick={() => navigate('/')}
              sx={{
                cursor: 'pointer',
              }}>
              <BackIcon />
              <Text as="h2" variant="h2" sx={{ m: 2, textTransform: 'capitalize' }}>
                {searchParams.get('topic')}
              </Text>
            </Flex>
            <TextBox
              clearable
              placeholder="Search"
              value={searchText}
              iconStart={<SearchIcon />}
              onChange={({ target: { value } }) => setSearchText(value)}
            />
            {/* <Input
              my={4}
              placeholder="Search"
              value={searchText}
              onChange={({ target: { value } }) => setSearchText(value)} 
            />*/}
          </Box>
        </Box>
        <Box sx={{ maxWidth: '786px' }} m="auto" p={3}>
          {renderBooks()}
        </Box>
      </Box>
      <Modal
        handleClose={() => setShowBookUnavailablePopup(false)}
        isOpen={showBookUnavailablePopup}>
        <Text>No viewable version available</Text>
      </Modal>
    </>
  );
}

export default Books;
