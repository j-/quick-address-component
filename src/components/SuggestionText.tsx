import * as React from 'react';

export interface Props {
  addressLabel: string;
  queryTerm: string;
}

const slice = (value: string, i: number) => [
  value.substring(0, i),
  value.substring(i),
];

const SuggestionText: React.FC<Props> = ({ addressLabel, queryTerm: queryString }) => {
  const queryTokens = queryString.split(/[^\w\d]+/g).map((token) => token.toLowerCase());

  const children = addressLabel
    .split(/([^\w\d]+)/g)
    .map((labelToken) => {
      const lowerCaseQueryToken = labelToken.toLowerCase();
      const queryToken = queryTokens.find((queryToken) => lowerCaseQueryToken.startsWith(queryToken));
      if (queryToken === undefined) {
        return labelToken;
      } else if (queryToken === labelToken) {
        return <strong>{labelToken}</strong>;
      } else {
        const [before, after] = slice(labelToken, queryToken.length);
        return <><strong>{before}</strong>{after}</>;
      }
    })
    .map((child, i) => (
      <React.Fragment key={i}>
        {child}
      </React.Fragment>
    ));

  return <>{children}</>;
};

export default SuggestionText;
