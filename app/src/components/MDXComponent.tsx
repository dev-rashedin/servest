import { Highlight } from 'prism-react-renderer';
import MyTheme from './theme/my-theme';

const MDXComponent = {
  code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const language = className?.replace('language-', '') || 'ts';
    const code = String(children).trim();

    return (
      <Highlight code={code} language={language} theme={MyTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
};

export default MDXComponent;
