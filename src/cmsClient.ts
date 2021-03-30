import { createClient } from "contentful";

export const cmsClient = () => {
  console.log(process.env);
  if (
    !process.env.REACT_APP_CONTENTFUL_SPACE ||
    !process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  )
    throw new Error("env variables are missing");

  return createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });
};
