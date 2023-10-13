import { SearchRequest, Wrapper } from './parts';

type NotFoundRulesSearchProps = {
  searchRequest: string;
};

export const NotFoundRulesSearch = ({ searchRequest }: NotFoundRulesSearchProps) => (
  <Wrapper>
    No results for <SearchRequest>{searchRequest}</SearchRequest>
  </Wrapper>
);
