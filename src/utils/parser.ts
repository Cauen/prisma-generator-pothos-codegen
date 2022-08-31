import Tokenizr from 'tokenizr';

type Omit = 'output' | 'input' | 'create' | 'update' | 'where' | 'orderBy';
type OmitType = 'all' | Omit[];
enum TokenType {
  DECORATOR = 'DECORATOR',
  OPEN_PAREN = 'OPEN_PAREN',
  CLOSE_PAREN = 'CLOSE_PAREN',
  OMIT_TYPE = 'OMIT_TYPE',
  SEPARATOR = 'SEPARATOR',
  CHAR = 'CHAR',
}

const tokenizr = new Tokenizr();
tokenizr.rule(/@Pothos\.omit/, (ctx) => ctx.accept(TokenType.DECORATOR));
tokenizr.rule(/\(/, (ctx) => ctx.accept(TokenType.OPEN_PAREN));
tokenizr.rule(/\)/, (ctx) => ctx.accept(TokenType.CLOSE_PAREN));
tokenizr.rule(/output|input|create|update|where|orderBy/, (ctx, match) =>
  ctx.accept(TokenType.OMIT_TYPE, match),
);
tokenizr.rule(/,\s*/, (ctx) => ctx.accept(TokenType.SEPARATOR));
tokenizr.rule(/./, (ctx) => ctx.accept(TokenType.CHAR));

/** Parses comment for omit commands in the following syntax:
 * /// @Pothos.omit() # Omits field from all inputs and output
 * /// @Pothos.omit(output, create) # Omits field from the output and the create input
 * /// @Pothos.omit(input) # Omits field from all inputs
 */
export const parseComment = (s: string): OmitType | null => {
  tokenizr.input(s);
  let prevToken: TokenType | null = null;
  let omitType: OmitType | null = null;
  tokenizr.tokens().forEach((token) => {
    const type = token.type as TokenType;
    switch (type) {
      case TokenType.DECORATOR:
        prevToken = TokenType.DECORATOR;
        omitType = null;
        break;
      case TokenType.OPEN_PAREN:
        if (prevToken === TokenType.DECORATOR) prevToken = TokenType.OPEN_PAREN;
        else {
          prevToken = null;
          omitType = null;
        }
        break;
      case TokenType.CLOSE_PAREN:
        if (prevToken === TokenType.OPEN_PAREN) omitType = 'all';
        prevToken = null;
        break;
      case TokenType.OMIT_TYPE:
        if (prevToken === TokenType.OPEN_PAREN || prevToken === TokenType.SEPARATOR) {
          if (omitType === null || omitType === 'all') omitType = [];
          omitType.push(token.text as Omit);
          prevToken = TokenType.OMIT_TYPE;
        } else prevToken = null;
        break;
      case TokenType.SEPARATOR:
        if (prevToken === TokenType.OMIT_TYPE) prevToken = TokenType.SEPARATOR;
        break;
      case TokenType.CHAR:
        if (prevToken !== null) {
          omitType = null;
          prevToken = null;
        }
        break;
    }
  });

  if (prevToken === null) return omitType;
  else return null;
};
