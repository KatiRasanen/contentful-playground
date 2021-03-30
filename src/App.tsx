import React, { useEffect, useState } from "react";
import "./App.css";
import { cmsClient } from "./cmsClient";
import * as dotenv from "dotenv";

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

dotenv.config();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState() as any;

  const getContent = async () =>
    await cmsClient()
      .getEntries()
      .then(function (entries: any) {
        console.log("täällä", entries);
        return entries.items;
      });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getContent();

      setContent(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  const Italic = ({ children }: any) => (
    <span style={styles.italic}>{children}</span>
  );
  const Bold = ({ children }: any) => (
    <span style={styles.bold}>{children}</span>
  );
  const Text = ({ children }: any) => <p style={styles.p}>{children}</p>;

  const Link = ({ children }: any) => (
    <a href="" style={styles.li}>
      {children}
    </a>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => <Bold>{text}</Bold>,

      [MARKS.ITALIC]: (text: any) => <Italic>{text}</Italic>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>,
    },
    renderLink: {
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return <Link>{children}</Link>;
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Loading...</p>
        ) : (
          content?.map((entry: any) => (
            <>
              <h2>{entry.fields.title}</h2>
              {documentToReactComponents(entry.fields.bodyText, options)}
            </>
          ))
        )}
      </header>
    </div>
  );
};

export default App;

const styles = {
  bold: {
    fontWeight: 500,
  },
  italic: { fontStyle: "italic" },
  p: {
    fontSize: 14,
    maxWidth: 400,
  },
  li: {
    color: "#98cfff",
  },
};
